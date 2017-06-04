import React, {PropTypes, PureComponent} from "react";
import classNames from "classnames/bind";
import styles from "./HorizontalButtonPanel.pcss";
import map from "lodash/fp/map";

const cx = classNames.bind(styles);

export default class HorizontalButtonPanel extends PureComponent {

  static propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.element).isRequired,
  };

  render() {

    let btnIndex = 0;

    const renderButton = (button) =>
      <div key={btnIndex++} className={cx('horizontal-button-panel__button-holder')}>
        {button}
      </div>;

    return (
      <div
        className={cx('horizontal-button-panel')}
      >
        { map(renderButton)(this.props.buttons) }
      </div>
    );
  }

}
