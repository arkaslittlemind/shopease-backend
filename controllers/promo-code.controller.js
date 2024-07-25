const PromoCode = require('../models/promo-code.model');

exports.createPromoCode = async (req, res) => {
  try {
    const newPromoCode = new PromoCode(req.body);
    await newPromoCode.save();
    res.status(201).json(newPromoCode);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.applyPromoCode = async (req, res) => {
  try {
    const { code, orderTotal } = req.body;
    const promoCode = await PromoCode.findOne({ code, isActive: true });

    if (!promoCode) {
      return res.status(404).json({ message: 'Invalid promo code' });
    }

    if (promoCode.usageCount >= promoCode.usageLimit) {
      return res.status(400).json({ message: 'Promo code usage limit reached' });
    }

    let discountedTotal;
    if (promoCode.discountType === 'percentage') {
      discountedTotal = orderTotal * (1 - promoCode.discountAmount / 100);
    } else {
      discountedTotal = Math.max(0, orderTotal - promoCode.discountAmount);
    }

    promoCode.usageCount += 1;
    await promoCode.save();

    res.json({ discountedTotal, discount: orderTotal - discountedTotal });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};