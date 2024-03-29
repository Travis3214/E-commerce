const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allData = await Tag.findAll({
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
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const idData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'category_id']
        }
      ]
    })
    if(!idData){
      res.status(404).json({ message: 'There is no tag with this id!' });
      return;
    }
    res.status(200).json(idData)
  } catch(err) {
    res.status(400).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const newData = await Tag.create({
      tag_name: req.body.tag_name
    })
    res.status(200).json(newData)
  } catch (err){
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const updateData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if (!updateData) {
      res.status(404).json({ message: 'There is no tag with this id!' });
      return;
    }
    res.status(200).json('The tag successfully updated!')
  } catch (err) {
    res.status(400).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    if(!deleteData){
      res.status(404).json({ message: 'There is tag with this id!' });
      return;
    }
    res.status(200).json('The tag has successfully deleted!')
  } catch(err) {
    res.status(400).json(err)
  }
});

module.exports = router;
