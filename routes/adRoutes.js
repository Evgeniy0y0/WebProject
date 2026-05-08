const express = require('express');
const router = express.Router();
const protect = require('../middleware/protect');
const restrictTo = require('../middleware/restrictTo');
const validate = require('../utils/validate');
const { createAdSchema, updateAdSchema } = require('../validators/adValidator');
const {
    getAllAds,
    getAd,
    createAd,
    updateAd,
    deleteAd
} = require('../controllers/adController');

router.get('/', getAllAds);
router.get('/:id', getAd);

router.post('/', protect, validate(createAdSchema), createAd);
router.put('/:id', protect, validate(updateAdSchema), updateAd);

router.delete('/:id', protect, restrictTo('admin'), deleteAd);

module.exports = router;