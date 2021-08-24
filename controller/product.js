const Product = require('../models/product')

//get
const getProducts = (req, resp, next) => {
  Product.find({}, (err, products) => {
    if (err) return resp.status(500).send({ message: `Error with product findById: ${err}`})
    if (!products) return res.status(404).send({ message: `There are not products.` })
    resp.send(200, { products })
  })
  
}

// get by Id 
const getProductId = (req, resp, next) => {
    const productId = req.params.productId

    Product.findById(productId, (err, product) => {
      if (err) return resp.status(500).send({ message: `Error with product findById: ${err}`})
      if (!product) return resp.status(404).send({ message: `The product doesn't exist.` })

      resp.status(200).send({ product })

    })
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
    getProductId,
    createProduct,
    updateProduct,
    deleteProduct
}