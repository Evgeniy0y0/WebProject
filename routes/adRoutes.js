const express = require('express');
const router = express.Router();
const protect = require('../middleware/protect');
const restrictTo = require('../middleware/restrictTo');
const validate = require('../middleware/validate');
const { createAdSchema, updateAdSchema } = require('../validators/adValidator');
const adController = require('../controllers/adController');
const inquiryRouter = require('./inquiryRoutes');

router.get('/', adController.getAllAds);
router.get('/:id', adController.getAd);

router.post('/', protect, validate(createAdSchema), adController.createAd);
router.put('/:id', protect, validate(updateAdSchema), adController.updateAd);
router.delete('/:id', protect, restrictTo('admin'), adController.deleteAd);

router.use('/:adId/inquiries', inquiryRouter);

module.exports = router;