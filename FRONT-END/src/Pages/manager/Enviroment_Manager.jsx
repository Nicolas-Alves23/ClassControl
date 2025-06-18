import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from "../Teachers/Teacher_Enviroument.module.css";
// Importação de icones 
import { FiPlus, FiEdit, FiTrash } from 'react-icons/fi';

export function Enviroument_Manager() {
    const [reserva_ambiente, setReserva_ambiente] = useState([]);

    
    useEffect(() => {
        const token = localStorage.getItem('access_token');

        axios.get('http://127.0.0.1:8000/api/reserva/', {
            headers: {
                'Authorization':`Bearer ${token}`
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

        axios.delete(`http://127.0.0.1:8000/api/reserva/${id}`,{
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
        <main>
              <div className={styles.filtro}>
        <h1>Reserva</h1>
        <Link to="/gestor/disciplina/criar/">
          <FiPlus size={24} title="Adicionar" />
        </Link>
      </div>
      <div style={{ marginTop: '1.5rem' }}>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Curso</th>
              <th>Descrição</th>
              <th>Professor</th>
              <th>Carga Horária</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {reserva_ambiente.map(reserva_ambiente => (
              <tr key={reserva_ambiente.id}>
                <td>{reserva_ambiente.data_inicio}</td>
                <td>{reserva_ambiente.data_termino}</td>
                <td>{reserva_ambiente.periodo}</td>
                <th>{reserva_ambiente.sala}</th>
                <td>{reserva_ambiente.professor}</td>
              {/* <td>
                  <Link to={`/gestor/disciplina/editar/${disciplina.id}`}>
                    <FiEdit size={20} title="Editar" />
                  </Link>
                  <FiTrash
                    size={20}
                    title="Excluir"
                    onClick={() => handleDelete(disciplina.id)}
                    style={{ cursor: 'pointer', marginLeft: '8px' }}
                  />
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </main>
    )
}