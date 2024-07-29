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

exports.getAvailablePromoCodes = async (req, res) => {
  try {
    const currentDate = new Date();
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const discountType = req.query.discountType;

    let query = {
      isActive: true,
      validFrom: { $lte: currentDate },
      validUntil: { $gte: currentDate },
      usageCount: { $lt: '$usageLimit' }
    };

    if (discountType) {
      query.discountType = discountType;
    }

    const availablePromoCodes = await PromoCode.find(query)
      .select('code discountType discountAmount validUntil')
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await PromoCode.countDocuments(query);

    res.status(200).json({
      promoCodes: availablePromoCodes,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalPromoCodes: total
    });
  } catch (error) {
    console.error('Error fetching available promo codes:', error);
    res.status(500).json({ message: 'Error fetching available promo codes' });
  }
};