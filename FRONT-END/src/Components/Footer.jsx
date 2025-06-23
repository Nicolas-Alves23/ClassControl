import React from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

export function Footer(){
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.info}>
          <p className={styles.brand}>ClassRoom</p>
          <p className={styles.description}>A junção da tecnologia e a gestão em um lugar</p>
        </div>

        <div className={styles.links}>
          <ul>
            <li><Link to="home" className={styles.links}>Home</Link></li>
            <li><Link to="/" className={styles.links}>Trocar de usuário</Link></li>
          </ul>
        </div>

        <div className={styles.socialMedia}>
          <a href="https://www.instagram.com/_nicvilela_/"  className={styles.icon}>Instagram</a>
          <a href="https://github.com/Nicolas-Alves23"  className={styles.icon}>Github</a>
          <a href="https://www.linkedin.com/in/nicolas-vilela-263a66290/"  className={styles.icon}>LinkedIn</a>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; 2025 ClassRoom. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

