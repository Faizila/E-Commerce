// import
const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// routes

router.get('/', async (req, res) => {
  try {
    // find all categories .findAll
    const catData = await Category.findAll({
      // its associated Products
    include: [{ model: Product }],
    });
    // success
    res.status(200).json(catData);
  } 
  // catch error
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find one category by its `id` value 
    const catData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
  });
// message for client
    if (!catData) {
      res.status(404).json({ message: 'No Category found with that id!' });
      return;
    }
// success
    res.status(200).json(catData);
     // catch error
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
   try {
     // create a new category .create
    const catData = await Category.create(req.body);
    // success
    res.status(200).json(catData);
    // catch error
  } catch (err) {
    res.status(400).json(err);
  }
});

 // .update by id
router.put('/:id', async (req, res) => { 
   try {
     // update a category by its `id` value
    const catData = await Category.update(req.body, {
      where: { id: req.params.id }
    });
// message for client
    if (!catData[0]) {
      res.status(404).json({ message: 'No Category found with that id!' });
      return;
    }
// success
    res.status(200).json(catData);
     // catch error
  } catch (err) {
    res.status(500).json(err);
  }
});

// .destory by id
router.delete('/:id', async (req, res) => {
    try {
      // delete a category by its `id` value
    const catData = await Category.destroy({
      where: { id: req.params.id }
    });
    // message for client
    if (!catData) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
     // success
    res.status(200).json(catData);
     // catch error
  } catch (err) {
    res.status(500).json(err);
  }
});

// export
module.exports = router;
