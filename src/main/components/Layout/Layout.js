import React, {PropTypes} from 'react';
import cx from 'classnames';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Background from './Background/Background';
import styles from './Layout.css';

class Layout extends React.Component {

    static propTypes = {
        className: PropTypes.string,
    };

    componentDidMount() {
        window.componentHandler.upgradeElement(this.root);
    }

    componentWillUnmount() {
        window.componentHandler.downgradeElements(this.root);
    }

    render() {
        return (
            <div className="mdl-layout mdl-layout__body mdl-js-layout" ref={node => (this.root = node)}>
                <div className="mdl-layout__inner-container">
                    <Header />
                    <main className="mdl-layout__content">
                        <div {...this.props} className={cx(styles.content, this.props.className)}/>
                    </main>
                    <Footer />
                </div>
                <Background />
            </div>
        );
    }
}

export default Layout;
