const Product = require('../models/product')

//get
const getProducts = (req, resp, next) => {
  resp.send(200, {products: []})
  res.status(404).send('Sorry cant find that!');
}

const getProductById = (req, resp, next) => {
    
}

//post
const createProduct = (req, resp, next) => {
  console.log('POST PRODUCT');  
  console.log(req.body);
  
  let product = {
    name : req.body.name,
    price : req.body.price,
    image : req.body.image,
    type : req.body.type,
    dateEntry : Date.parse(req.body.dateEntry)
  }
  
  Product.create(product, (err, productStored) => { //cuando se almacene, mongodb le adiciona un id
    if (err) resp.status(500).send({message: `Oppss... There is an error in the data base: ${err}`})

    else { resp.status(200).send({ product: productStored })}
  }) 
}

//put
const updateProduct = (req, resp, next) => {
    
}

//delete
const deleteProduct = (req, resp, next) => {
    
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}