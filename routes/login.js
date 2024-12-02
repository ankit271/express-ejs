const express = require('express');
const router = express.Router();

const { login,getUserCountByCountry } = require('../controllers/LoginController');

router.route('/').get(getUserCountByCountry)
      .post(login)
module.exports = router;
