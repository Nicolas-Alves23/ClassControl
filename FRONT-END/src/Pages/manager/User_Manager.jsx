import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from "./styles_manager.module.css";
import { Header } from "../../components/Header";
// Importação dos ícones do React Icons
import { FiPlus, FiEdit, FiTrash } from 'react-icons/fi';

export function User_Manager() {
  const [usuario, setUsuario] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    axios.get('http://127.0.0.1:8000/api/usuario/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setUsuario(response.data);
      console.log(response.data)
    })
    .catch(error => {
      console.error("Erro ao buscar usuario:", error);
    });

  }, []);

  const handleDelete = (id) => {
    const confirmar = window.confirm('Tem certeza que deseja excluir esta reserva?');
    if (!confirmar) return;

    const token = localStorage.getItem('access_token');

    axios.delete(`http://127.0.0.1:8000/api/usuario/${id}/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(() => {
      alert('usuário excluído com sucesso!');
      setUsuario(prev => prev.filter(dis => dis.id !== id));
    })
    .catch(error => {
      console.error('Erro ao excluir usuário:', error);
      alert('Erro ao excluir a usuário.');
    });
  };

  return (
    <><Header />
    <main className={styles.container_manger}>
      <div className={styles.name_page_manager}>
        <h1>Usuarios disponíveis</h1>
        <Link to="/gestor/usuario/register/">
          <FiPlus size={40} title="Adicionar" />
        </Link>
      </div>
      <div className={styles.box_read}>
        <table className={styles.table_manager}>
          <thead>
            <tr className={styles.title_table}>
              <th>Id</th>
              <th>Username</th>
              <th>Ni</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Tipo</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody className={styles.conteudo_table}>
            {usuario.map(user => (
              <tr key={user.id}>
                <td className={styles.text_in_tbody}>{user.id}</td>
                <td className={styles.text_in_tbody}>{user.username}</td>
                <td className={styles.text_in_tbody}>{user.ni}</td>
                <td className={styles.text_in_tbody}>{user.email}</td>
                <td className={styles.text_in_tbody}>{user.telefone}</td>
                <td className={styles.text_in_tbody}>{user.tipo}</td>
                <td className={styles.text_in_tbody}>
                  <Link to={`/gestor/usuario/editar/${user.id}`}>
                    <FiEdit size={20} title="Editar" />
                  </Link>
                  <FiTrash
                    size={20}
                    title="Excluir"
                    onClick={() => handleDelete(user.id)}
                    style={{ cursor: 'pointer', marginLeft: '8px' }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main></>
  );
}
