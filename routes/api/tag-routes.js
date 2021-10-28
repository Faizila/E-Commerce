// import
const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// routes 

 // find all tags
// be sure to include its associated Product data
// .findAll
router.get('/', async (req, res) => {
  try {
    const tData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tData);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

// find a single tag by its `id`
// be sure to include its associated Product data
// .findByPk
router.get('/:id', async (req, res) => {
  try {
    const tData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!tData) {
      res.status(404).json({ message: 'No Tag found with that id!' });
      return;
    }

    res.status(200).json(tData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag
// .create
router.post('/', async (req, res) => {
  try {
    const tData = await Tag.create(req.body);
    res.status(200).json(tData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a tag's name by its `id` value
// .update by id
router.put('/:id', (req, res) => {
  try {
    const tData = await Tag.update(req.body, {
      where: { id: req.params.id }
    });

    if (!tData[0]) {
      res.status(404).json({ message: 'No Tag found with that id!' });
      return;
    }

    res.status(200).json(tData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete on tag by its `id` value
// .destory by id
router.delete('/:id', (req, res) => {
  try {
    const tData = await Tag.destroy({
      where: { id: req.params.id }
    });
    if (!tData) {
      res.status(404).json({ message: 'No Tag with this id!' });
      return;
    }
    res.status(200).json(tData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// export
module.exports = router;
