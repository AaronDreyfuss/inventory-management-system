const Item = require('../models/itemModel');
const itemController = {};

itemController.createItem = async (req, res, next) => {
  const { name, description, quantity} = req.body;
  
  try{
    res.locals.newItem = await Item.create({ name, description, quantity });
    console.log(res.locals.newItem.name + ' has been created.');
    return next();
  } catch(err) {
    if(err.name === 'ValidationError') {
      const message = Object.keys(err.errors).map(field => ({
        field,
        message: err.errors[field].message,
        value: err.errors[field].value,
        type: err.errors[field].kind || err.errors[field].name
      }));
      err = {
        log: 'Item was not created',
        status: 400,
        message
      };
    }
    return next(err);
  }
};
  
itemController.readItems = async (req, res, next) => {
  try {
    res.locals.items = await Item.find();
    console.log('Refreshed');
    return next();
  } catch(err) {
    console.log(err);
    return next(err);
  }
};
  
itemController.deleteItem = async (req, res, next) => {
  const { id } = req.params;
  try {
    res.locals.deletedItem = await Item.findByIdAndDelete(id);
  
    if(!res.locals.deletedItem) throw {
      log: 'Item was not found',
      status: 404,
      message: { err: 'This item ID does not exist.' },
    };
  
    console.log('Item was deleted');
    return next();
  } catch(err) {
    return next(err);
  }
};

module.exports = itemController;