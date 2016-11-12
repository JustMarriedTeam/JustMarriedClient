import React from 'react';
import cx from 'classnames';
import styles from './Background.css';

class Background extends React.Component {

    render() {
        return (
            <div className={cx(styles.body, this.props.className)}></div>
        );
    }

}

export default Background;
