const express = require('express');
const router = express.Router();
const { spidLogin } = require('../controllers/spidController');

// POST /api/spid-login
router.post('/spid-login', spidLogin);

module.exports = router;
