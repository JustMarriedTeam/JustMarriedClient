import React, { PropTypes, PureComponent } from 'react';
import classnames from 'classnames/bind';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Immutable from 'immutable';
import styles from './ItemSelector.pcss';

const cx = classnames.bind(styles);

export default class ItemSelector extends PureComponent {

  static propTypes = {
    allItems: PropTypes.instanceOf(Immutable.Seq).isRequired,
    selectedItems: PropTypes.instanceOf(Immutable.Seq).isRequired,
    disabledItems: PropTypes.instanceOf(Immutable.Seq).isRequired,
    selectNestedItemsFor: PropTypes.func.isRequired,
    onSelectionChange: PropTypes.func.isRequired,
  };

  render() {
    const { allItems, selectedItems, disabledItems,
      onSelectionChange, selectNestedItemsFor } = this.props;

    const renderItem = (item, key) => {
      const nestedItems = selectNestedItemsFor(item);
      const isDisabled = disabledItems.includes(item);
      const isSelected = selectedItems.contains(item);
      const activeProperties = {};

      if (!isDisabled) {
        activeProperties.leftCheckbox = (<Checkbox
          checked={isSelected}
          onCheck={(e, wasChecked) => onSelectionChange(item, !wasChecked)}
        />);
      }

      return (<ListItem
        key={key}
        open={isSelected}
        disabled={isDisabled}
        {...activeProperties}
        nestedItems={nestedItems.map(renderItem).toArray()}
        primaryText={item.name}
        secondaryText={item.description}
      />);
    };

    return (
      <List className={cx('item-selector')}>

        {
          allItems.map((item, key) => renderItem(item, key))
        }

      </List>
    );
  }

}
