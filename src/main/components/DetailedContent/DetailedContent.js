import React, { PropTypes, PureComponent } from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import classnames from 'classnames/bind';
import styles from './DetailedContent.pcss';
import Scroll from 'react-scroll';

const cx = classnames.bind(styles);
const scroll = Scroll.animateScroll;

export default class DetailedContent extends PureComponent {

  static defaultProps = {
    fixDetails: true,
  };

  static propTypes = {
    showDetails: PropTypes.bool.isRequired,
    fixDetails: PropTypes.bool,
    details: PropTypes.element.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.showDetails && nextProps.showDetails) {
      scroll.scrollToTop({
        duration: 0,
        smooth: false,
      });
    }
  }

  render() {
    const { showDetails, details, fixDetails, children } = this.props;

    return (
      <StickyContainer
        className={cx('detailed-content', {
          'detailed-content--detailed': showDetails,
        })}
      >
        <div className={cx('detailed-content__main-pane')}>{children}</div>
        <div className={cx('detailed-content__details-pane')}>
          <Sticky isActive={fixDetails} style={{ zIndex: 0 }}>{details}</Sticky>
        </div>
      </StickyContainer>
    );
  }

}
