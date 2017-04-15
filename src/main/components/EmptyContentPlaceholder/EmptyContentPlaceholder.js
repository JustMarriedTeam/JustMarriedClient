import React, { PureComponent } from 'react';
import CreateIcon from 'material-ui/svg-icons/content/create';
import ContentPlaceholder from '../ContentPlaceholder';

export default class EmptyContentPlaceholder extends PureComponent {

  render() {
    return (
      <ContentPlaceholder icon={<CreateIcon />}>
        <h3>Nothing here!</h3>
        <p>{this.props.children}</p>
      </ContentPlaceholder>
    );
  }

}
