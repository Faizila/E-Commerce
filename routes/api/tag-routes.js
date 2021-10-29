// import
const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// routes 

router.get('/', async (req, res) => {
  try {
    // find all tags .findAll
    const tData = await Tag.findAll({
      // its associated Product data
      include: [{ model: Product }],
    });
    // success
    res.status(200).json(tData);
  } 
  // catch error
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find a single tag by its `id` 
    const tData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
  });
// message for client
    if (!tData) {
      res.status(404).json({ message: 'No Tag found with that id!' });
      return;
    }
// success
    res.status(200).json(tData);
    // catch error
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    // create a new tag .create
    const tData = await Tag.create(req.body);
    // success
    res.status(200).json(tData);
    // catch error
  } catch (err) {
    res.status(400).json(err);
  }
});


// .update by id
router.put('/:id', async (req, res) => {
  try {
    // update a tag's name by its `id` value
    const tData = await Tag.update(req.body, {
      where: { id: req.params.id }
    });
// message for client
    if (!tData[0]) {
      res.status(404).json({ message: 'No Tag found with that id!' });
      return;
    }
// success
    res.status(200).json(tData);
    // catch error
  } catch (err) {
    res.status(500).json(err);
  }
});

// .destory by id
router.delete('/:id', async (req, res) => {
  try {
    // delete one tag by its `id` value
    const tData = await Tag.destroy({
      where: { id: req.params.id }
    });
    // message for client
    if (!tData) {
      res.status(404).json({ message: 'No Tag with this id!' });
      return;
    }
    // success
    res.status(200).json(tData);
    // catch error
  } catch (err) {
    res.status(500).json(err);
  }
});

// export
module.exports = router;
