const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll();
    include: [{ model:  }, { model:  }],
    res.status(200).json(categoryData);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const catData = await Category.findByPk(req.params.id, {
      include: [{ model:  }, { model:  }],
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

router.post('/', (req, res) => {
  // create a new category
  try {
    const ctData = await Category.create(req.body);
    res.status(200).json(ctData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const cData = await Category.findByPk(req.params.id, {
      include: [{ model:  }, { model:  }],
    });

    if (!cData) {
      res.status(404).json({ message: 'No Category found with that id!' });
      return;
    }

    res.status(200).json(cData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const ctData = await Category.destroy({
      where: { id: req.params.id }
    });
    if (!ctData) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(ctData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
