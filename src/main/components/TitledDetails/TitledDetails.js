import React, {PropTypes, PureComponent} from 'react';
import classNames from 'classnames/bind';
import IconButton from 'material-ui/IconButton';
import styles from './TitledDetails.pcss';

const cx = classNames.bind(styles);

export default class TitledDetails extends PureComponent {

  static propTypes = {
    title: PropTypes.string.isRequired,
    onBack: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className={cx('titled-details')}>
        <IconButton
          className={cx('titled-details__icon')}
          name="back"
          iconClassName="ion-ios-arrow-back"
        />
        <div className={cx('title-details__title')}>{this.props.title}</div>
      </div>
    );
  }

}
