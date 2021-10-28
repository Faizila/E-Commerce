const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll();
    res.status(200).json(TagData);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tData = await Tag.findByPk(req.params.id, {
      include: [{ model:  }, { model:  }],
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

router.post('/', (req, res) => {
  // create a new tag
  try {
    const tgData = await Tag.create(req.body);
    res.status(200).json(tgData);
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
    const tagsData = await Tag.destroy({
      where: { id: req.params.id }
    });
    if (!tagsData) {
      res.status(404).json({ message: 'No Tag with this id!' });
      return;
    }
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
