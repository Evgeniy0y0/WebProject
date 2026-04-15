const Ad = require('../models/Ad');
const AppError = require('../utils/AppError');

exports.getAllAds = async (req, res, next) => {
    try {
        const ads = await Ad.find().populate('createdBy', 'name email');
        res.status(200).json({
            success: true,
            count: ads.length,
            data: ads
        });
    } catch (err) {
        next(err);
    }
};

exports.getAd = async (req, res, next) => {
    try {
        const ad = await Ad.findById(req.params.id).populate('createdBy', 'name email');
        if (!ad) {
            return next(new AppError('Ad not found', 404));
        }
        res.status(200).json({ success: true, data: ad });
    } catch (err) {
        if (err.name === 'CastError') {
            return next(new AppError('Invalid ad ID format', 404));
        }
        next(err);
    }
};

exports.createAd = async (req, res, next) => {
    try {
        const ad = await Ad.create({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            location: req.body.location,
            category: req.body.category,
            createdBy: req.user._id  
        });
        res.status(201).json({
            success: true,
            data: ad
        });
    } catch (err) {
        next(err);
    }
};

exports.updateAd = async (req, res, next) => {
    try {
        const ad = await Ad.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!ad) {
            return next(new AppError('Ad not found', 404));
        }
        res.status(200).json({
            success: true,
            data: ad
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteAd = async (req, res, next) => {
    try {
        const ad = await Ad.findByIdAndDelete(req.params.id);
        if (!ad) {
            return next(new AppError('Ad not found', 404));
        }
        res.status(200).json({
            success: true,
            message: 'Ad deleted successfully'
        });
    } catch (err) {
        next(err);
    }
};