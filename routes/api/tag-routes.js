// import
const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// routes 

// .findAll
router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
});

// .findByPk
router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

// .create
router.post('/', (req, res) => {
  // create a new tag
});

// .update
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

// .findByPk
router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

// export
module.exports = router;
