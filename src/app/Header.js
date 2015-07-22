import React from 'react';
import styles from './Header.css';


export default class Header extends React.Component {
  render() {
    return (
      <header className={styles.header}>
        <a className={styles.logo} href="/">Logo</a>
      </header>
    );
  }
}
