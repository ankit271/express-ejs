const Product = require('../models/Product');

async function getProducts(req, res) {
    try {

        const products = await Product.find({});
        
        if(isArrayEmptyOrNull(products)){
            return res.status(404).render('./product/index',
                    {message : "No Product found.",products: products,title:'Products Listing'}
                );
        }       
       res.status(200).render('./product/index',{title:'Products Listing',products: products,message: ''})
       
    } catch (error) {        
        throw new Error('Error while geting the products : ' + error.message);
    }
}

async function createProduct(req, res) {
    try {
       
        const product = new Product({
            product_name : req.body.name,
            product_description : req.body.description,
            product_price : req.body.price,
            product_quantity : req.body.quantity
    });
        
        const productCreated = await product.save();
        if(!productCreated){
            return res.status(500).send(
                    {message : "Error while creating the products."}
                );
        }    
      const products = await Product.find({});   
      return res.status(200).render('./product/index',{products: products,message: 'Product Created Successfully.', title: 'Product Listing'})
       
    } catch (error) {        
        throw new Error('Error while creating the products : ' + error.message);
    }
}

async function create(req, res) {
    try {                 
      return res.status(200).render('./product/create',{title:'Create Product'})
       
    } catch (error) {        
        throw new Error('Error while create products : ' + error.message);
    }
}


function isArrayEmptyOrNull(arr) {
    return !Array.isArray(arr) || arr.length === 0;
}


module.exports = {
    getProducts,createProduct,create
}