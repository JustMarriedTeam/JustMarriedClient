import React from 'react';
import Layout from '../../layout/Layout';
import s from './styles.css';
import { title, html } from './index.md';

export default class AboutPage extends React.Component {

  componentDidMount() {
    document.title = title;
  }

  render() {
    return (
            <Layout>
                <h1>{title}</h1>
                <div dangerouslySetInnerHTML={{ __html: html }} />
            </Layout>
    );
  }

}
