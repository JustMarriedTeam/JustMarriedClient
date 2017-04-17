import React, { PropTypes, PureComponent } from 'react';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Immutable from 'immutable';

export default class TaskSelector extends PureComponent {

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
          onCheck={(e, wasChecked) => {
            const x = 1;
            alert(`elo elo ${x}`);
            onSelectionChange(item, !wasChecked);
          }}
        />}
        onNestedListToggle={() => setTimeout(() => window.dispatchEvent(new Event('resize')))}
        nestedItems={nestedItems.map(renderItem).toArray()}
        primaryText={item.name}
        secondaryText={item.description}
      />);
    };

    return (
      <List>

        {
          allItems.filter((item) => item.requiredFor.isEmpty())
            .map((item, key) => renderItem(item, key))
        }

      </List>
    );
  }

}
