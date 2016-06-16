'use strict';

import React from 'react';

require('styles/items/Item.sass');

class ItemComponent extends React.Component {
  render() {
    return (
      <div className="item-component">
        Please edit src/components/items//ItemComponent.js to update this component!
      </div>
    );
  }
}

ItemComponent.displayName = 'ItemsItemComponent';

// Uncomment properties you need
// ItemComponent.propTypes = {};
// ItemComponent.defaultProps = {};

export default ItemComponent;
