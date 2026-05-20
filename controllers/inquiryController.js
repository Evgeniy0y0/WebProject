const catchAsync = require('../utils/catchAsync');
const inquiryService = require('../services/inquiryService');

exports.getInquiries = catchAsync(async (req, res) => {
  const inquiries = await inquiryService.getInquiriesByAd(req.params.adId);
  res.status(200).json({ success: true, count: inquiries.length, data: inquiries });
});

exports.createInquiry = catchAsync(async (req, res) => {
  const inquiry = await inquiryService.createInquiry(
    req.body,
    req.params.adId,
    req.user._id
  );
  res.status(201).json({ success: true, data: inquiry });
});

exports.deleteInquiry = catchAsync(async (req, res) => {
  await inquiryService.deleteInquiry(req.params.id, req.user);
  res.status(200).json({ success: true, message: 'Inquiry successfully deleted' });
});