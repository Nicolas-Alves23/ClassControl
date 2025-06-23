import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from "./styles_manager.module.css";
import { Header } from "../../components/Header";
// Importação dos ícones do React Icons
import { FiPlus, FiEdit, FiTrash } from 'react-icons/fi';

export function Classroom_Manager() {
  const [salas, setsalas] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    axios.get('http://127.0.0.1:8000/api/sala/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setsalas(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error("Erro ao buscar salas:", error);
      });

  }, []);

  const handleDelete = (id) => {
    const confirmar = window.confirm('Tem certeza que deseja excluir esta reserva?');
    if (!confirmar) return;

    const token = localStorage.getItem('access_token');

    axios.delete(`http://127.0.0.1:8000/api/sala/${id}/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(() => {
        alert('Disciplina excluída com sucesso!');
        setsalas(prev => prev.filter(dis => dis.id !== id));
      })
      .catch(error => {
        console.error('Erro ao excluir disciplina:', error);
        alert('Erro ao excluir a disciplina.');
      });
  };

  return (
    <><Header />
    <main className={styles.container_manger}>
      <div className={styles.name_page_manager}>
        <h1>Salas disponíveis</h1>
        <Link to="/gestor/sala/register/">
          <FiPlus size={40} title="Adicionar" />
        </Link>
      </div>
      <div className={styles.box_read}>
        <table className={styles.table_manager}>
          <thead>
            <tr className={styles.title_table}>
              <th>ID</th>
              <th>Nome</th>
              <th>Capacidade de alunos</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody className={styles.conteudo_table}>
            {salas.map(sala => (
              <tr key={sala.id}>
                <td className={styles.text_in_tbody}>{sala.id}</td>
                <td className={styles.text_in_tbody}>{sala.nome}</td>
                <td className={styles.text_in_tbody}>{sala.capacidade} alunos</td>
                <td className={styles.text_in_tbody}>
                  <Link to={`/gestor/sala/editar/${sala.id}`}>
                    <FiEdit size={20} title="Editar" />
                  </Link>
                  <FiTrash
                    size={20}
                    title="Excluir"
                    onClick={() => handleDelete(sala.id)}
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
