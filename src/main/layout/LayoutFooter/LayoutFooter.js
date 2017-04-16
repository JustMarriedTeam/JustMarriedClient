import React, { PureComponent } from 'react';
import { Flex, Box } from 'reflexbox';
import Image from '../../components/Image';
import classnames from 'classnames/bind';
import styles from './LayoutFooter.pcss';

const cx = classnames.bind(styles);
const logo = require('../../assets/logo2.png');

export default class LayoutFooter extends PureComponent {

  render() {
    return (
      <Flex className={cx('layout-footer')}>

        <Box p={2} sm={12} md={6}>
          <Image src={logo} />
        </Box>

        <Box p={2} sm={12} md={6}>
          <a>DO this</a>
          <a>DO that</a>
        </Box>

        <Box p={2} sm={12} md={6}>
          <a>DO this</a>
          <a>DO that</a>
          <a>DO this</a>
          <a>DO that</a>
        </Box>

      </Flex>
    );
  }
}
