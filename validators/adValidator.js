const Joi = require('joi');

const createAdSchema = Joi.object({
    title: Joi.string().max(100).required(),
    description: Joi.string().required(),
    price: Joi.number().min(0).required(),
    location: Joi.string().required(),
    category: Joi.string().valid('cars', 'realty', 'electronics', 'jobs', 'services', 'other').required()
});

const updateAdSchema = Joi.object({
    title: Joi.string().max(100),
    description: Joi.string(),
    price: Joi.number().min(0),
    location: Joi.string(),
    category: Joi.string().valid('cars', 'realty', 'electronics', 'jobs', 'services', 'other')
}).min(1);

module.exports = { createAdSchema, updateAdSchema };