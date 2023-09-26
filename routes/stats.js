const express = require('express');
const stats = require('../controllers/stats');
const router = express.Router();

/**
 * stats route
 */
router.use('/', stats);



module.exports = router;