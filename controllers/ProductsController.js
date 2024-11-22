async function getProducts(req, res) {
    try {

        const products = [
            {
                name : 'Product 1',
                price : 100,
                description : 'This is a product 1'
            },
            {
                name : 'Product 2',
                price : 10,
                description : 'This is a product 2'
            },
            {
                name : 'Product 3',
                price : 1000,
                description : 'This is a product 3'
            }
    ];

        if(!products){
            return res.status(404).send({message : "No Product found."});
        }       
       res.status(200).render('./product/index',{title:'Products Listing',products: products})
       
    } catch (error) {        
        throw new Error('Error while geting the products : ' + error.message);
    }
}

module.exports = {
    getProducts
}