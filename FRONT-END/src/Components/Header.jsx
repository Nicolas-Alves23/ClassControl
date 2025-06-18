import styles from './Header.module.css'
import { Link } from 'react-router-dom'

export function Header() {
    return (
        <header>
            <nav className={styles.container}>
                <ul>
                    <li><Link to="/home">M</Link></li>
                    <li>Meus Age</li>
                    <li>Agend</li>
                    <li>Visualizar sala</li>
                    <li><Link to="/">Login</Link></li>
                </ul>
            </nav>
        </header>
    )
}