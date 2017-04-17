import React, { PureComponent } from 'react';
import { Flex, Box } from 'reflexbox';
import Image from '../../components/Image';
import FooterLinkGroup, { FooterLinkItem } from './FooterLinkGroup';
import classnames from 'classnames/bind';
import styles from './LayoutFooter.pcss';

const cx = classnames.bind(styles);
const logo = require('../../assets/logo2.png');

export default class LayoutFooter extends PureComponent {

  render() {
    return (
      <Flex
        wrap
        align="stretch"
        justify="space-around"
        className={cx('layout-footer')}
      >

        <Box p={4} sm={12} md={4}>
          <Image src={logo} />
        </Box>

        <Box p={2} sm={12} md={4}>

          <FooterLinkGroup title="Wedding">

            <FooterLinkItem
              to={'/home'}
              primaryText="Home"
            />

            <FooterLinkItem
              to={'/wedding'}
              primaryText="Wedding"
            />

            <FooterLinkItem
              to={'/tasks'}
              primaryText="Tasks"
            />

            <FooterLinkItem
              to={'/timeline'}
              primaryText="Timeline"
            />

          </FooterLinkGroup>

        </Box>

        <Box p={2} sm={12} md={4}>

          <FooterLinkGroup title="Business">

            <FooterLinkItem
              to={'/about'}
              primaryText="About us"
            />

            <FooterLinkItem
              to={'/business'}
              primaryText="For business"
            />

            <FooterLinkItem
              to={'/diary'}
              primaryText="Our weddings"
            />

          </FooterLinkGroup>

        </Box>

      </Flex>
    );
  }
}
