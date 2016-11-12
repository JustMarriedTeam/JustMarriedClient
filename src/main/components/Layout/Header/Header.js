import React from 'react';
import Navigation from '../Navigation/Navigation';
import Link from '../../Link';
import s from './Header.css';

class Header extends React.Component {

    componentDidMount() {
        window.componentHandler.upgradeElement(this.root);
    }

    componentWillUnmount() {
        window.componentHandler.downgradeElements(this.root);
    }

    render() {
        return (
            <header
                className={`mdl-layout__header mdl-layout__header--transparent ${s.header}`}
                ref={node => (this.root = node)}
            >
                <div className={`mdl-layout__header-row ${s.row}`}>
                    <Link className={`mdl-layout-title ${s.title}`} to="/">
                        JustWedding.pl
                    </Link>
                    <div className="mdl-layout-spacer"></div>
                    <Navigation />
                </div>
            </header>
        );
    }

}

export default Header;
