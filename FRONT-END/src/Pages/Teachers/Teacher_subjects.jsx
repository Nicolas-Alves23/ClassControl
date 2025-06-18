import axios from "axios";
import React, { useState, useEffect, useCallback } from 'react';
import { CardSubjects } from "../../components/CardSubjects";
import { ToggleSwitch } from "../../components/ToggleSwitch";
import styles from "./Teacher_subjects.module.css";

export function Teacher_subjects() {
  const [disciplinas, setDisciplinas] = useState([]);
  const [filtrarEn, setFiltrarEn] = useState('api/disciplina/');

  const token = localStorage.getItem('access_token');

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

  // Função chamada ao alternar o ToggleSwitch
  const handleToggle = (isOn) => {
    if (isOn) {
      setFiltrarEn('api/disciplina_professor/');
    } else {
      setFiltrarEn('api/disciplina/');
    }
    console.log("Toggle está", isOn ? "Ligado" : "Desligado");
  };

  return (
        <div className={styles.container}>
            <div className={styles.filtro}>
                <h1>Agendamentos</h1>
                <ToggleSwitch label={"Minhas disciplinas"}  onToggle={handleToggle}/>
            </div>

            <div className={styles.container_cards}>
              {disciplinas.map((disciplina, index) => (
                <CardSubjects
                  key={index}
                  nome={disciplina.nome}
                  carga_horario={disciplina.carga_horario}
                  curso={disciplina.curso}
                  descricao={disciplina.descricao}
                />
              ))}
            </div>
        </div>
  );
}
