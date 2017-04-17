import React, { PropTypes, PureComponent } from 'react';
import ResponsiveBox from '../ResponsiveBox';
import { Sticky } from 'react-sticky';
import classnames from 'classnames/bind';
import styles from './DetailedContextBar.pcss';

const cx = classnames.bind(styles);

export default class DetailedContextBar extends PureComponent {

  static propTypes = {
    showDetails: PropTypes.bool.isRequired,
    details: PropTypes.element.isRequired,
  };

  render() {
    const { showDetails, details, children } = this.props;

    return (
      <Sticky
        style={{ zIndex: 100 }}
        className={cx('detailed-context-bar', {
          'detailed-context-bar--detailed': showDetails,
        })}
      >

        <ResponsiveBox>
          <div className={cx('detailed-context-bar__holder')}>
            <div className={cx('detailed-context-bar__main-bar')}>{children}</div>
            <div className={cx('detailed-context-bar__details-bar')}>{details}</div>
          </div>
        </ResponsiveBox>

      </Sticky>
    );
  }

}
