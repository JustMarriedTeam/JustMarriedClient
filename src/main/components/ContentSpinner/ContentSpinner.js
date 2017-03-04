import React, { PureComponent } from 'react';
import classnames from 'classnames/bind';
import styles from './ContentSpinner.pcss';

const cx = classnames.bind(styles);

class ContentSpinner extends PureComponent {

  render() {
    return (
      <div className={cx('content-spinner')}>
        <div className={cx('content-spinner__holder')}>
          <div className={cx('content-spinner__spinner')}>
            <div className={cx('spinner-heart__main')}>
              <div className={cx('spinner-heart__heart')}>
                <span className={cx('spinner-heart__heartL')} />
                <span className={cx('spinner-heart__heartR')} />
                <span className={cx('spinner-heart__square')} />
              </div>
              <div className={cx('spinner-heart__shadow')} />
            </div>
          </div>
          <div className={cx('content-spinner__text')}>
            <h4>Please wait</h4>
          </div>
        </div>
      </div>
    );
  }

}

export default ContentSpinner;
