const express = require('express');
const router = express.Router();
const { getProducts,createProduct,create } = require('../controllers/ProductsController');


router.route('/').get(getProducts)        
        .post(createProduct);

router.route('/create').get(create);
module.exports = router;