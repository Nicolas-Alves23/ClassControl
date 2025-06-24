import styles from './Header.module.css'
import { Link } from 'react-router-dom'

export function Header() {
        // para ser possivel colocar e manipular o nome do usuário
      const username = localStorage.getItem("username"); 
    return (
        <header className={styles.container_header}>
            <nav>
                <ul>
                    <li><Link to="/home">ClassControl</Link></li>
                    <li className={styles.name_in_header}><Link to="/">Olá {username}</Link></li>
                </ul>
            </nav>
        </header>
    )
}
