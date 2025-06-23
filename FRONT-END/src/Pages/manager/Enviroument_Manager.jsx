import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from "./styles_manager.module.css";
// Importação de icones 
import { FiPlus, FiEdit, FiTrash } from 'react-icons/fi';
import { Header } from "../../components/Header";

export function Enviroument_Manager() {
  const [reserva_ambiente, setReserva_ambiente] = useState([]);


  useEffect(() => {
    const token = localStorage.getItem('access_token');

    axios.get('http://127.0.0.1:8000/api/reserva/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setReserva_ambiente(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error("Erro ao buscar as reservas", error);
      });
  }, []);

  const handleDelete = (id) => {
    const confirmar = window.confirm('Tem certeza que você quer excluir isso?');
    if (!confirmar) return;

    const token = localStorage.getItem('access_token');

    axios.delete(`http://127.0.0.1:8000/api/reserva/${id}/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(() => {
        alert('A reserva do ambiente foi excluida')
        setReserva_ambiente(prev => prev.filter(dispatchEvent.id !== id));
      })
      .catch(error => {
        console.error('Erro ao excluir')
        alert('Erro ao exluir')
      });
  };

  return (
    <><Header />
    <main className={styles.container_manger}>
      <div className={styles.name_page_manager}>
        <h1>Reserva</h1>
        <Link to="/gestor/reserva/criar/">
          <FiPlus size={40} title="Adicionar" />
        </Link>
      </div>
      <div className={styles.box_read}>
        <table className={styles.table_manager}>
          <thead className={styles.title_table}>
            <tr>
              <th>ID</th>
              <th>Data inicio</th>
              <th>Data Termino</th>
              <th>Periodo</th>
              <th>Professor id</th>
              <th>Sala id</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody className={styles.conteudo_table}>
            {reserva_ambiente.map(reserva_ambiente => (
              <tr key={reserva_ambiente.id}>
                <td className={styles.text_in_tbody}>{reserva_ambiente.id}</td>
                <td className={styles.text_in_tbody}>{reserva_ambiente.data_inicio}</td>
                <td className={styles.text_in_tbody}>{reserva_ambiente.data_termino}</td>
                <td className={styles.text_in_tbody}>{reserva_ambiente.periodo}</td>
                <th className={styles.text_in_tbody}>{reserva_ambiente.sala}</th>
                <td className={styles.text_in_tbody}>{reserva_ambiente.professor}</td>
                <td className={styles.text_in_tbody}>
                  <Link to={`/gestor/reserva/editar/${reserva_ambiente.id}`}>
                    <FiEdit size={20} title="Editar" />
                  </Link>
                  <FiTrash
                    size={20}
                    title="Excluir"
                    onClick={() => handleDelete(reserva_ambiente.id)}
                    style={{ cursor: 'pointer', marginLeft: '8px' }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main></>
  )
}