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
    selectNestedItemsFor: PropTypes.func.isRequired,
    onSelectionChange: PropTypes.func.isRequired,
  };

  render() {
    const { allItems, selectedItems,
      onSelectionChange, selectNestedItemsFor } = this.props;

    const renderItem = (item, key) => {
      const nestedItems = selectNestedItemsFor(item);
      const isSelected = selectedItems.contains(item);

      return (<ListItem
        key={key}
        leftCheckbox={<Checkbox
          checked={isSelected}
          onCheck={(e, wasChecked) => onSelectionChange(item, !wasChecked)}
        />}
        nestedItems={nestedItems.map(renderItem).toArray()}
        primaryText={item.name}
        secondaryText={item.description}
      />);
    };

    return (
      <List className={cx('item-selector')}>

        {
          allItems.filter((item) => item.requiredFor.isEmpty())
            .map((item, key) => renderItem(item, key))
        }

      </List>
    );
  }

}
