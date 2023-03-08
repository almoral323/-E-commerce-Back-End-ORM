const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categData = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categIdData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!categIdData) {
      res.status(404).json({ message: 'There is no category associated with this ID' });
      return;
    }
    res.status(200).json(categIdData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categData = await Category.create(req.body);
    res.status(200).json(categData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCatData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!updatedCatData[0]) {
      res.status(404).json({ message: 'There is no category associated with this ID' });
      return;
    }
    res.status(200).json(updatedCatData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCat = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deleteCat) {
      res.status(404).json({ message: 'There is no category associated with this ID' });
      return;
    }
    res.status(404).json(deleteCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
