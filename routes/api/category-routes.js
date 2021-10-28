// import
const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// routes

 // find all categories
// be sure to include its associated Products
// .findAll
router.get('/', async (req, res) => {
  try {
    const catData = await Category.findAll({
    include: [{ model: Product }],
    });
    res.status(200).json(catData);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value
// be sure to include its associated Products
// .findByPk
router.get('/:id', async (req, res) => {
  try {
    const catData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!catData) {
      res.status(404).json({ message: 'No Category found with that id!' });
      return;
    }

    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

 // create a new category
// .create
router.post('/', async (req, res) => {
   try {
    const catData = await Category.create(req.body);
    res.status(200).json(catData);
  } catch (err) {
    res.status(400).json(err);
  }
});

 // update a category by its `id` value
// .update by id
router.put('/:id', async (req, res) => { 
   try {
    const catData = await Category.update(req.body, {
      where: { id: req.params.id }
    });

    if (!catData[0]) {
      res.status(404).json({ message: 'No Category found with that id!' });
      return;
    }

    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a category by its `id` value
// .destory by id
router.delete('/:id', async (req, res) => {
    try {
    const catData = await Category.destroy({
      where: { id: req.params.id }
    });
    if (!catData) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// export
module.exports = router;
