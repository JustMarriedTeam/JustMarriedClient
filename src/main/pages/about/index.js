import React from 'react';
import layout from '../../layout/Layout';
import s from './styles.css';
import {title, html} from './index.md';

class AboutPage extends React.Component {

    componentDidMount() {
        document.title = title;
    }

    render() {
        return (
            <layout className={s.content}>
                <h1>{title}</h1>
                <div dangerouslySetInnerHTML={{__html: html}}/>
            </layout>
        );
    }

}

export default AboutPage;
