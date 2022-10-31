const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const userData = Tag.findAll().catch((err) => {
    res.json(err);
  });
  res.json(userData);
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const userData = Tag.findByPk(req.params.id);
    if (!userData) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const userData = Tag.create(req.body);
    // 200 status code means the request is successful
    res.status(200).json(userData);
  } catch (err) {
    // 400 status code means the server could not understand the request
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const userData = Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!userData[0]) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const userData = Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!userData) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
