// import
const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// routes

 // find all categories
// be sure to include its associated Products
// .findAll
router.get('/', (req, res) => {
  //  try {
  //   const productData = await Product.findAll();
  //   import: [{ Model: }]
  //   res.status(200).json(productData);
  // } 
  // catch (err) {
  //   res.status(500).json(err);
  // }
});

// .findByPk
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

// .create
router.post('/', (req, res) => {
  // create a new category
});

// .findByPk
router.put('/:id', (req, res) => { 
  // update a category by its `id` value
});

// .findByPk
router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

// export
module.exports = router;
