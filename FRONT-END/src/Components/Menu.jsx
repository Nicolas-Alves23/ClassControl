import styles from "./Menu.module.css";
import { FaChalkboardTeacher, FaSchool, FaBookOpen, FaUserTie, FaDoorClosed } from "react-icons/fa";
import { CardMenu } from "./CardMenu";
import { Link } from 'react-router-dom'
import { motion } from "framer-motion"

export function Menu() {
    const tipo = localStorage.getItem("tipo");

    // Define rotas com base no tipo do usuário
    const link_disciplinas = tipo === 'P' ? '/professor/disciplina' : '/gestor/disciplina';
    const link_ambientes = tipo === 'P' ? '/professor/reserva' : '/gestor/reserva';
    const link_usuarios = tipo == 'P' ? '/a' : '/gestor/usuario';
    const link_salas = tipo === 'P' ? '/salas' : '/gestor/sala';

    return (
        <main className={styles.main_in_menu}>
            <article className={styles.box_top}>
                {/* Este bloco está gerenciando o Bloco do topo da Home */}
                <section className={styles.top_box_in_home}> {/* Classe para manipular a foto e o texto e um grid Layout*/}
                    <div className={styles.texts}>
                        <h1 className={styles.first_text_pag}>Gerencie suas salas com facilidade e eficiência. </h1>
                        <h2 className={styles.second_text_pag}>Deixe para trás os problemas de organização e burocracia. Com nossa solução, você acompanha em tempo real o status das salas.Transforme a gestão das suas salas em uma tarefa simples e automatizada.</h2>
                        <button className={styles.buttondegrade}>Sobre Nós</button>
                    </div>
                </section>
            </article>
            {/* Botões que são a parte mais importante do site */}
            <div className={styles.container}>
                <motion.div className={styles.containerCard}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >

                    <Link to={link_disciplinas}>
                        <CardMenu icon={FaBookOpen} label="Disciplinas" />
                    </Link>

                    <Link to={link_ambientes}>
                        <CardMenu icon={FaSchool} label="Ambientes" />
                    </Link>

                    {/* Só exibe Professores e Gestores se tipo for 'G' */}
                    {tipo === 'G' && (
                        <>
                            <Link to={link_usuarios}>
                                <CardMenu icon={FaChalkboardTeacher} label="Professores" />
                            </Link>
                            <Link to="http://127.0.0.1:8000/admin/">
                                <CardMenu icon={FaUserTie} label="Administrador" />
                            </Link>
                            <Link to={link_salas}>
                                <CardMenu icon={FaDoorClosed} label="Salas" />
                            </Link>
                        </>
                    )}

                </motion.div>
            </div>

        </main>
    );
}
