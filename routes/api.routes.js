const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const promoCodeController = require('../controllers/promo-code.controller');
const referralController = require('../controllers/referral.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// User routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Promo code routes
router.post('/promo-codes', authMiddleware, promoCodeController.createPromoCode);
router.post('/promo-codes/apply', authMiddleware, promoCodeController.applyPromoCode);

// Referral routes
router.post('/referrals', authMiddleware, referralController.createReferral);
router.post('/referrals/:referralId/redeem', authMiddleware, referralController.redeemReferral);

// Route to fetch available promo codes
router.get('/promo-codes/available', authMiddleware, promoCodeController.getAvailablePromoCodes);

// Route to fetch user's referrals status
router.get('/referrals/status', authMiddleware, referralController.getReferralStatus);

module.exports = router;