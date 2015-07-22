import React from 'react';
import styles from './Content.css';

export default class Content extends React.Component {
  render() {
    return (
      <section className={styles.content}>
        <h1>Hello, SydJS!</h1>
      </section>
    );
  }
}
