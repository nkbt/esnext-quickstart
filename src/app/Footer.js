import React from 'react';
import styles from './Footer.css';

export default class Footer extends React.Component {
  render() {
    return (
      <footer className={styles.footer}>
        <p>2015 &copy; Nik Butenko</p>
      </footer>
    );
  }
}
