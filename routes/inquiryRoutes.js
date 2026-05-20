const express = require('express');
const router = express.Router({ mergeParams: true }); 

const protect = require('../middleware/protect');
const validate = require('../middleware/validate');
const { createInquirySchema } = require('../validators/inquiryValidator');
const inquiryController = require('../controllers/inquiryController');

router.get('/', inquiryController.getInquiries);
router.post('/', protect, validate(createInquirySchema), inquiryController.createInquiry);
router.delete('/:id', protect, inquiryController.deleteInquiry);

module.exports = router;