import axios from "axios";
import React, { useState, useEffect, useCallback } from 'react';
import { CardSubjects } from "../../components/CardSubjects";
import styles from "./Teacher_subjects.module.css";
import { useNavigate } from "react-router-dom";

// Esse componente é responsável por listar as disciplinas disponíveis
// Ele busca as disciplinas da API e exibe em cartões, permitindo ao professor ver suas disciplinas
export function Teacher_subjects() {
  const [disciplinas, setDisciplinas] = useState([]);
  const [filtrarEn, setFiltrarEn] = useState('api/disciplina_professor/');

  const token = localStorage.getItem('access_token');
    const navigate = useNavigate();
    if(!token){
        navigate('/')
    }

  // Função que busca as disciplinas com base no endpoint atual
  const fetchDisciplinas = useCallback(() => {
    axios.get(`http://127.0.0.1:8000/${filtrarEn}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setDisciplinas(response.data);
    })
    .catch(error => {
      console.error("Erro ao buscar disciplinas:", error);
    });
  }, [filtrarEn, token]);

  // Atualiza as disciplinas quando o endpoint muda
  useEffect(() => {
    fetchDisciplinas();
  }, [fetchDisciplinas]);



  return (
        <main className={styles.container}>
        
                <h1>Agendamentos</h1>
        

            <div className={styles.container_cards}>
              {disciplinas.map((disciplina, index) => (
                <CardSubjects
                  key={index}
                  nome={disciplina.nome}
                  carga_horaria={disciplina.carga_horario}
                  curso={disciplina.curso}
                  descricao={disciplina.descricao}
                />
              ))}
            </div>
        </main>
  );
}