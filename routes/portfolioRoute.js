const express = require('express');
const router = express.Router();
const { sendEmailController } = require('../controllers/portfolioController.js');

// define the email sending route
router.post('/sendEmail', sendEmailController);

module.exports = router;