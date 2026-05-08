const catchAsync = require('../utils/catchAsync');
const adService = require('../services/adService');

exports.getAllAds = catchAsync(async (req, res) => {
    const result = await adService.getAllAds(req.query);
    res.status(200).json({
        success: true,
        count: result.data.length,
        pagination: result.pagination,
        data: result.data
    });
});

exports.getAd = catchAsync(async (req, res) => {
    const ad = await adService.getAdById(req.params.id);
    res.status(200).json({
        success: true,
        data: ad
    });
});

exports.createAd = catchAsync(async (req, res) => {
    const ad = await adService.createAd(req.body, req.user._id);
    res.status(201).json({
        success: true,
        data: ad
    });
});

exports.updateAd = catchAsync(async (req, res) => {
    const ad = await adService.updateAd(req.params.id, req.body, req.user);
    res.status(200).json({
        success: true,
        data: ad
    });
});

exports.deleteAd = catchAsync(async (req, res) => {
    await adService.deleteAd(req.params.id);
    res.status(200).json({
        success: true,
        message: 'Ad deleted successfully'
    });
});