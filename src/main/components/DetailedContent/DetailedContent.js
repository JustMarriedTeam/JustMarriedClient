import React, { PropTypes, PureComponent } from 'react';
import classnames from 'classnames/bind';
import styles from './DetailedContent.pcss';

const cx = classnames.bind(styles);

export default class DetailedContent extends PureComponent {

  static defaultProps = {
    fixDetails: true,
  };

  static propTypes = {
    showDetails: PropTypes.bool.isRequired,
    fixDetails: PropTypes.bool,
    details: PropTypes.element.isRequired,
  };

  render() {
    const { showDetails, details, fixDetails, children } = this.props;

    return (
      <div
        className={cx('detailed-content', {
          'detailed-content--detailed': showDetails,
        })}
      >
        <div className={cx('detailed-content__main-pane')}>{children}</div>
        <div className={cx('detailed-content__details-pane')}>
          <div
            className={cx('detailed-content__details-holder', {
              'detailed-content__details-holder--fixed': fixDetails,
            })}
          >
            {details}
          </div>
        </div>
      </div>
    );
  }

}
