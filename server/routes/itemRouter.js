const itemController = require('../controllers/itemController');

const express = require('express');
const router = express.Router();

router.post('/', itemController.createItem, (req, res) => {
  return res.status(201).json(res.locals.newItem);
});
  
router.get('/', itemController.readItems, (req, res) => {
  return res.status(200).json(res.locals.items);
});
  
router.delete('/:id', itemController.deleteItem, (req, res) => {
  return res.status(200).json(res.locals.deletedItem);
});

module.exports = router;