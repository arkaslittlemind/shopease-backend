const Referral = require('../models/referral.model');
const User = require('../models/user.model');
const PromoCode = require('../models/promo-code.model');

exports.createReferral = async (req, res) => {
  try {
    
    const { referralCode, newUserId } = req.body;
    
    const referrer = await User.findOne({ referralCode });
    

    if (!referrer) {
      return res.status(404).json({ message: 'Invalid referral code' });
    }

    
    const newReferral = new Referral({
      referrer: referrer._id,
      referred: newUserId
    });

    await newReferral.save();
    
    res.status(201).json(newReferral);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.redeemReferral = async (req, res) => {
  try {
    const { referralId } = req.params;
    const referral = await Referral.findById(referralId);

    if (!referral || referral.status === 'completed') {
      return res.status(400).json({ message: 'Invalid or already redeemed referral' });
    }

    const promoCode = new PromoCode({
      code: `REF${Math.random().toString(36).substring(7).toUpperCase()}`,
      discountType: 'fixed',
      discountAmount: 10,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      usageLimit: 1
    });

    await promoCode.save();

    referral.status = 'completed';
    referral.rewardClaimed = true;
    await referral.save();

    res.json({ message: 'Referral redeemed successfully', promoCode: promoCode.code });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};