const express = require('express');
const router = express.Router();
const protect = require('../middleware/protect');
const restrictTo = require('../middleware/restrictTo');
const {
    getAllAds,
    getAd,
    createAd,
    updateAd,
    deleteAd
} = require('../controllers/adController');

router.get('/', getAllAds);
router.get('/:id', getAd);

router.post('/', protect, createAd);
router.put('/:id', protect, updateAd);

router.delete('/:id', protect, restrictTo('admin'), deleteAd);

module.exports = router;