// import
const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// routes

router.get('/', async (req, res) => {
  try {
    // find all products .findAll
    const prodData = await Product.findAll({
      // its associated Category and Tag data
      include: [{ model: Category } , { model: Tag }],
    });
    // success
    res.status(200).json(prodData);
  } 
  // catch error
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find a single product by its `id` 
    const prodData = await Product.findOne({
      where: {
        id: req.params.id
      },
      // its associated data
      include: [{ model: Category }, { model: Tag }],
  });
// message for client
    if (!prodData) {
      res.status(404).json({ message: 'No Product found with that id!' });
      return;
    }
// success
    res.status(200).json(prodData);
    // catch error
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product .create
router.post('/', (req, res) => {
  Product.create({
    product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock,
    tagIds: req.body.tagIds
  })
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product 
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

// .destory by id
router.delete('/:id', async (req, res) => {
  try {
   // delete one product by its `id` value
    const prodData = await Product.destroy({
      where: { id: req.params.id }
    });
    // message for client
    if (!prodData) {
      res.status(404).json({ message: 'No Product with this id!' });
      return;
    }
    // success
    res.status(200).json(prodData);
    // catch error
  } catch (err) {
    res.status(500).json(err);
  }
});

// export
module.exports = router;
