import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { ListItem } from 'material-ui/List';
import { active } from './ListItemLink.css';


export default class ListItemLink extends Component {

  static propTypes = {
    to: PropTypes.string.isRequired,
  };

  render() {
    return (
            <ListItem
              containerElement={
                    <Link to={this.props.to}
                      activeClassName={active}
                    />
                }
              {...this.props}
            />
    );
  }

}
