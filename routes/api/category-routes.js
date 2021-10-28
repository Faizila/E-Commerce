// import
const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// routes

// .findAll
router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
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
