const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // Finds all categories and includes their associated Products
  try {
    const categories = await Category.findAll({
      include: { model: Product, as: 'products' }
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.get('/:id', async (req, res) => {
  // Find one category by its `id` value and include it's associated products
  try {
    const category = await Category.findByPk(req.params.id, {
      include: { model: Product, as: 'products' }
    });

    if (!category) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.post('/', async (req, res) => {
  // Create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  };
});

router.put('/:id', async (req, res) => {
  // Update a category by its `id` value
  try {
    const category = await Category.update( req.body, {
      where: {
        id: req.params.id
      }
    });

    if (!category) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.delete('/:id', async (req, res) => {
  // Delete a category by its `id` value
  try {
    const category = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!category) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;