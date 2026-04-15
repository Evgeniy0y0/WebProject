const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [100, 'Title too long']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    location: {
        type: String,
        required: [true, 'Location is required']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['cars', 'realty', 'electronics', 'jobs', 'services', 'other']
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Ad', adSchema);