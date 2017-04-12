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
    onSelectionChange: PropTypes.func.isRequired,
  };

  render() {
    const { allItems, selectedItems, onSelectionChange } = this.props;

    return (
      <List className={cx('item-selector')}>

        {
          allItems.map((item, key) => <ListItem
            key={key}
            leftCheckbox={
              <Checkbox
                checked={selectedItems.contains(item)}
                onCheck={(e, wasChecked) => onSelectionChange(item, !wasChecked)}
              />
            }
            primaryText={item.name}
            secondaryText={item.description}
          />)
        }

      </List>
    );
  }

}
