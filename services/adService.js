const Ad = require('../models/Ad');
const AppError = require('../utils/AppError');

exports.getAllAds = async (queryParams) => {
    const {
        page = 1,
        limit = 10,
        category,
        location,
        minPrice,
        maxPrice,
        sort = 'newest'
    } = queryParams;

    const filter = {};
    if (category) filter.category = category;
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (minPrice !== undefined || maxPrice !== undefined) {
        filter.price = {};
        if (minPrice !== undefined) filter.price.$gte = Number(minPrice);
        if (maxPrice !== undefined) filter.price.$lte = Number(maxPrice);
    }

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, parseInt(limit)); 
    const skip = (pageNum - 1) * limitNum;

    let sortOption = {};
    switch (sort) {
        case 'price_asc':
            sortOption = { price: 1 };
            break;
        case 'price_desc':
            sortOption = { price: -1 };
            break;
        case 'oldest':
            sortOption = { createdAt: 1 };
            break;
        case 'newest':
        default:
            sortOption = { createdAt: -1 };
            break;
    }

    const ads = await Ad.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(limitNum)
        .populate('createdBy', 'name email');

    const total = await Ad.countDocuments(filter);

    return {
        data: ads,
        pagination: {
            page: pageNum,
            limit: limitNum,
            total,
            pages: Math.ceil(total / limitNum)
        }
    };
};

exports.getAdById = async (id) => {
    const ad = await Ad.findById(id).populate('createdBy', 'name email');
    if (!ad) {
        throw new AppError('Ad not found', 404);
    }
    return ad;
};

exports.createAd = async (data, userId) => {
    const ad = await Ad.create({
        title: data.title,
        description: data.description,
        price: data.price,
        location: data.location,
        category: data.category,
        createdBy: userId
    });
    return ad;
};

exports.updateAd = async (id, updateData, currentUser) => {
    const ad = await Ad.findById(id);
    if (!ad) {
        throw new AppError('Ad not found', 404);
    }

    const isOwner = ad.createdBy.toString() === currentUser._id.toString();
    const isAdmin = currentUser.role === 'admin';

    if (!isOwner && !isAdmin) {
        throw new AppError('You are not allowed to update this ad', 403);
    }

    if (updateData.title) ad.title = updateData.title;
    if (updateData.description) ad.description = updateData.description;
    if (updateData.price !== undefined) ad.price = updateData.price;
    if (updateData.location) ad.location = updateData.location;
    if (updateData.category) ad.category = updateData.category;

    await ad.save();
    return ad;
};

exports.deleteAd = async (id) => {
    const ad = await Ad.findByIdAndDelete(id);
    if (!ad) {
        throw new AppError('Ad not found', 404);
    }
    return ad;
};