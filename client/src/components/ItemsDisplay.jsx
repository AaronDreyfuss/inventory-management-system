import React from 'react';

const ItemsDisplay = ({ items, onDeleteItem }) => (
  <div>
    {items.map(({ _id, name, description, quantity }) => (
      <div key={_id}>
        {name} - {description} - {quantity}
        <button onClick={() => onDeleteItem(_id)}>Delete</button>
      </div>
    ))}
  </div>
);

export default ItemsDisplay;