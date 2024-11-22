const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: [true,'Product Name is required.']        
    },
    product_description:{
        type: String,
        required: [true,'Product Description is required.']
    },
    product_price:{
        type: Number,
        required: [true,'Product Price is required.']
    },
    product_quantity:{
        type: Number,
        required: [true,'Product Quantity is required.']
    }
},{
    timestamps : true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;