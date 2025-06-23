import styles from './Header.module.css'
import { Link } from 'react-router-dom'

export function Header() {
        // para ser possivel colocar e manipular o nome do usuário
      const username = localStorage.getItem("username"); 
    return (
        <header className={styles.container_header}>
            <nav>
                <ul>
                    <li><Link to="/home">M</Link></li>
                    <li>Meus Age</li>
                    <li>Agend</li>
                    <li>Visualizar sala</li>
                    <li><Link to="/">Login</Link></li>
                    <li className={styles.name_in_header}>Olá {username}</li>
                </ul>
            </nav>
        </header>
    )
}