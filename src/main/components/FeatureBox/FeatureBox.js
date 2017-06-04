import React, {PropTypes, PureComponent} from "react";
import classnames from "classnames/bind";
import Paper from "material-ui/Paper";
import styles from "./FeatureBox.pcss";

const cx = classnames.bind(styles);

export default class FeatureBox extends PureComponent {

  static propTypes = {
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={cx('feature-box')}>
        <Paper className={cx('feature-box__paper')} zDepth={2} circle={true}>

          <span className={cx('feature-box__image-helper')} />

          <img
            role="presentation"
            className={cx('feature-box__image')}
            src={this.props.icon}
          />

        </Paper>
        <p className={cx('feature-box__title')}>{this.props.title}</p>
      </div>
    );
  }

}
