const express = require('express');
const hasMutation = require('../controllers/mutation');
const router = express.Router();

/**
 * Mutation route
 */
router.use('/', hasMutation);



module.exports = router;