const Inquiry = require('../models/Inquiry');
const AppError = require('../utils/AppError');

exports.getInquiriesByAd = async (adId) => {
  return await Inquiry.find({ ad: adId }).populate('user', 'name email');
};

exports.createInquiry = async (data, adId, userId) => {
  return await Inquiry.create({
    ...data,
    ad: adId,
    user: userId
  });
};

exports.deleteInquiry = async (inquiryId, currentUser) => {
  const inquiry = await Inquiry.findById(inquiryId);
  
  if (!inquiry) throw new AppError('Inquiry not found', 404); 

  if (
    inquiry.user.toString() !== currentUser._id.toString() && 
    currentUser.role !== 'admin'
  ) {
    throw new AppError('You do not have permission to delete this inquiry', 403);
  }

  await inquiry.deleteOne();
  return inquiry;
};