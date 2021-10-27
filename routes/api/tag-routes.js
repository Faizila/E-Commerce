const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const TagData = await Tag.findAll();
    res.status(200).json(TagData);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const TgData = await Tag.create(req.body);
    res.status(200).json(TgData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const TagsData = await Tag.destroy({
      where: { id: req.params.id }
    });
    if (!TagsData) {
      res.status(404).json({ message: 'No Tag with this id!' });
      return;
    }
    res.status(200).json(TagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
