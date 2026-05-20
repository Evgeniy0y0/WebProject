const Joi = require('joi');

const createInquirySchema = Joi.object({
  message: Joi.string().min(10).max(500).required().messages({
    'string.min': 'Inquiry message must be at least 10 characters long',
    'any.required': 'Inquiry message is required'
  })
});

module.exports = { createInquirySchema };