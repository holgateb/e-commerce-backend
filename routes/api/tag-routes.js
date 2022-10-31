const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // Find all tags and include their associated Product data
  try {
    const tags = await Tag.findAll({
      include: { model: Product, through: ProductTag, as: 'products' }
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.get('/:id', async (req, res) => {
  // Find a single tag by its `id` and include it's associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: { model: Product, through: ProductTag, as: 'products' }
    });

    if (!tag) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.post('/', async (req, res) => {
  // Create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  };
});

router.put('/:id', async (req, res) => {
  // Update a tag's name by its `id` value
  try {
    const tag = await Tag.update( req.body, {
      where: {
        id: req.params.id
      }
    });

    if (!tag) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.delete('/:id', async (req, res) => {
  // Delete on tag by its `id` value
  try {
    const tag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tag) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;