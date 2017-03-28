import React, { PureComponent, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import SearchAction from 'material-ui/svg-icons/action/search';
import classnames from 'classnames/bind';
import styles from './ContentFilter.pcss';

const cx = classnames.bind(styles);

export default class ContentFilter extends PureComponent {

  static propTypes = {
    onFilter: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className={cx('content-filter')}>
        <SearchAction className={cx('content-filter__icon')} />
        <TextField
          hintText="Filter"
          className={cx('content-filter__text')}
          onChange={(evt, value) => this.props.onFilter(value)}
        />
      </div>
    );
  }
}
