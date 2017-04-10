import React, { PureComponent } from 'react';
import AssignmentIcon from 'material-ui/svg-icons/action/assignment';
import ContentPlaceholder from '../ContentPlaceholder';

export default class EmptyContentPlaceholder extends PureComponent {

  render() {
    return (
      <ContentPlaceholder icon={<AssignmentIcon />}>
        <h3>Nothing here yet!</h3>
        <p>{this.props.children}</p>
      </ContentPlaceholder>
    );
  }

}
