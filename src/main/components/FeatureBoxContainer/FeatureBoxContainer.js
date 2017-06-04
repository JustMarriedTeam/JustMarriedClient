import React, {PropTypes, PureComponent} from "react";
import classnames from "classnames/bind";
import map from "lodash/fp/map";
import styles from "./FeatureBoxContainer.pcss";

const cx = classnames.bind(styles);

export default class FeatureBoxContainer extends PureComponent {

  static propTypes = {
    features: PropTypes.arrayOf(PropTypes.element).isRequired,
  };

  render() {

    let btnIndex = 0;

    const renderFeature = (feature) =>
      <div key={btnIndex++} className={cx('feature-box__item')}>
        {feature}
      </div>;

    return (
      <div className={cx('feature-box')}>
        {map(renderFeature)(this.props.features)}
      </div>
    );
  }

}
