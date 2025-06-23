import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { data } from 'react-router-dom';


const schemaAmbiente = z.object({

    periodo: z.string({
        invalid_type_error: 'Selecione um periodo'
    }).min(1, 'Selecione um periodo'),
    professor: z.number({
        invalid_type_error: 'Selecione um professor'
    }).min(1, 'Selecione um professor'),
    sala: z.number({
        invalid_type_error: 'Selecione uma sala'
    }).min(1, 'Selecione um sala'),
    disciplina: z.number({
        invalid_type_error: 'Selecione uma disciplina'
    }).min(1, 'Selecione um disciplina'),
    data_inicio: z.string()
        .refine(val => !isNaN(Date.parse(val)), { message: "Data de contratação inválida" }),
    data_termino: z.string()
        .refine(val => !isNaN(Date.parse(val)), { message: "Data de nascimento inválida" }),

});

export function Enviroument_Register() {
    const [professores, setProfessores] = useState([]);
    const [salas, setSalas] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [reserva_ambiente, setReserva_ambiente] = useState([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schemaAmbiente)
    });

    useEffect(() => {
        async function buscarProfessores() {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/api/usuario/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setProfessores(response.data);
            } catch (error) {
                console.error("Erro ao carregar professores", error);
            }
        }
        buscarProfessores();
    }, []);

    useEffect(() => {
        async function buscarDisciplinas() {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/api/disciplina/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setDisciplinas(response.data);
            } catch (error) {
                console.error("Erro ao carregar disciplina", error);
            }
        }
        buscarDisciplinas();
    }, []);


    useEffect(() => {
        async function buscarSalas() {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/api/sala/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setSalas(response.data);
            } catch (error) {
                console.error("Erro ao carregar salas", error);
            }
        }
        buscarSalas();
    }, []);



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

    async function obterDadosFormulario(data) {
        console.log("Dados do formulário:", data);
        try {
            const token = localStorage.getItem('access_token');

            const response = await axios.post(
                'http://127.0.0.1:8000/api/reserva/',
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('Reserva cadastrado com sucesso!', response.data);
            alert('Reserva cadastrado com sucesso!');
            reset();

        } catch (error) {
            console.error('Erro ao cadastrar Reserva', error);
            alert("Erro ao cadastrar Reserva");
        }
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit(obterDadosFormulario)}>
                <h2>Cadastro de Reserva</h2>



                <label>Professor</label>
                <select {...register('professor', { valueAsNumber: true })}>
                    <option value="">Selecione um professor</option>
                    {professores.map((prof) => (
                        prof.tipo == "P" && (
                            <option key={prof.id} value={prof.id}>
                                {prof.username}
                            </option>
                        )
                    ))}
                </select>
                {errors.professor && <p className='error'>{errors.professor.message}</p>}

                <label>Sala</label>
                <select {...register('sala', { valueAsNumber: true })}>
                    <option value="">Selecione um sala</option>
                    {salas.map((sala) => (
                        <option key={sala.id} value={sala.id}>
                            {sala.nome}
                        </option>
                    ))}
                </select>
                {errors.sala && <p className='error'>{errors.sala.message}</p>}

                <label>Disciplina</label>
                <select {...register('disciplina', { valueAsNumber: true })}>
                    <option value="">Selecione uma disciplina</option>
                    {disciplinas.map((disciplina) => (
                        <option key={disciplina.id} value={disciplina.id}>
                            {disciplina.nome}
                        </option>
                    ))}
                </select>
                {errors.disciplina && <p className='error'>{errors.disciplina.message}</p>}

                <label>Data de inicio</label>
                <input
                    type="date"
                    {...register("data_inicio")}
                />
                {errors.data_inicio && <p className="error">{errors.data_inicio.message}</p>}

                <label>Data de termino</label>
                <input
                    type="date"
                    {...register("data_termino")}
                />
                {errors.data_termino && <p className="error">{errors.data_termino.message}</p>}

                <label >Periodo</label>
                <select name="periodo" id="period">
                    <option value=""> Selecione</option>
                    <option value="M"> Manhã</option>
                    <option value="T"> Tarde</option>
                    <option value="N"> Noite</option>
                </select>
                {errors.periodo && <p className='error'>{errors.periodo.message}</p>}
                
                <div>
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
        </div>
    );
}
