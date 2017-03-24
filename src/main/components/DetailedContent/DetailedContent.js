import React, { PropTypes, PureComponent } from 'react';
import classnames from 'classnames/bind';
import styles from './DetailedContent.pcss';

const cx = classnames.bind(styles);

export default class DetailedContent extends PureComponent {

  static propTypes = {
    showDetails: PropTypes.bool.isRequired,
    details: PropTypes.element.isRequired,
  };

  render() {
    return (
      <div
        className={cx('detailed-content', {
          'detailed-content--detailed': this.props.showDetails,
        })}
      >
        <div className={cx('detailed-content__main-pane')}>{this.props.children}</div>
        <div className={cx('detailed-content__details-pane')}>{this.props.details}</div>
      </div>
    );
  }

}
