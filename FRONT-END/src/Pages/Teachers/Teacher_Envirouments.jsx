import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { CardEnviroument } from "../../components/CardEnviroument";
import styles from "./Teacher_Enviroument.module.css";
import { useNavigate } from "react-router-dom";

export function Teacher_Envirouments() {
    const [enviroument, setEnviroument] = useState([]);
    const token = localStorage.getItem('access_token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token, navigate]);

    const fetchAmbientes = useCallback(() => {
        axios.get(`http://127.0.0.1:8000/api/reserva_professor/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setEnviroument(response.data);
        })
        .catch(error => {
            console.error("Erro ao buscar agendamentos:", error);
        });
    }, [token]);

    useEffect(() => {
        fetchAmbientes();
    }, [fetchAmbientes]);

    return (
        <main className={styles.container}>
    
                <h1>Agendamentos de um Ambiente</h1>
    

            <div className={styles.container_cards}>
                {enviroument.map((reserva, index) => (
                    <CardEnviroument
                        key={index}
                        sala={reserva.sala}
                        professor={reserva.professor}
                        data={reserva.data}
                        periodo={reserva.periodo}
                        id={reserva.id}
                    />
                ))}
            </div>
        </main>
    );
}
