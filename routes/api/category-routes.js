const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allData = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'category_id']
        }
      ]
    })
    res.status(200).json(allData)
  } catch(err) {
    res.status(400).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const idData = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'category_id']
        }
      ]
    })
    if(!idData){
      res.status(404).json({ message: 'There is no category with this id!' });
      return;
    }
    res.status(200).json(idData)
  } catch(err) {
    res.status(400).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try{
    const newData = await Category.create({
      category_name: req.body.category_name
    })
    res.status(200).json(newData)
  } catch (err){
    res.status(400).json(err)
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
