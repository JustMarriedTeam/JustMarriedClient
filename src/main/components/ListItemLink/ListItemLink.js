import React, { PureComponent, PropTypes } from 'react';
import { Link } from 'react-router';
import { ListItem } from 'material-ui/List';
import { active } from './ListItemLink.css';


export default class ListItemLink extends PureComponent {

  static propTypes = {
    to: PropTypes.string.isRequired,
  };

  render() {
    return (
      <ListItem
        containerElement={
          <Link
            to={this.props.to}
            activeClassName={active}
          />
        }
        {...this.props}
      />
    );
  }

}
