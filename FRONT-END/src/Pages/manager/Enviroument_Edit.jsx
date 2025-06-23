import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { data } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import style from "./styles_register_and_edit.module.css"
import { Header } from "../../components/Header";

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

export function Enviroument_Edit() {

    const { id } = useParams();
    const navigate = useNavigate();
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
          async function buscaredit() {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/api/reserva/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setProfessores(response.data);
                console.log(response.data)
                console.log("Token:", token);
                console.log("ID da reserva:", id);
                console.log("URL da requisição:", `http://127.0.0.1:8000/api/reserva/${id}/`);

                //Preenche o formulários com os dados do registro do ID
                const resreserva = await axios.get(`http://127.0.0.1:8000/api/reserva/${id}/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                });
                console.log("Segunda etapa feita")
                // Preenche o formulário
                reset(resreserva.data);

            } catch (error) {
                console.error("Erro ao carregar professores", error);
            }

        }
        buscaredit();
    }, []);

    async function obterDadosFormulario(data) {
        console.log("Dados do formulário:", data);
        try {
            const token = localStorage.getItem('access_token');

            const response = await axios.put(
                `http://127.0.0.1:8000/api/reserva/${id}/`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('reserva atualizada com sucesso!', response.data);
            alert('reserva atualizado com sucesso!');
            reset();
            navigate('/home');

        } catch (error) {
            console.error('Erro ao cadastrar reserva', error);
            alert("Erro ao cadastrar reserva");
        }
    }

    return (
        <><Header />
        <main className={style.container_register_and_edit}>
            <form className={style.form_register} onSubmit={handleSubmit(obterDadosFormulario)}>
                <h2 className={style.title_register_and_edit}>Cadastro de Reserva</h2>



                <label className={style.label_in_pag}>Professor</label>
                <select  className={style.input_in_pag}{...register('professor', { valueAsNumber: true })}>
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

                <label className={style.label_in_pag}>Sala</label>
                <select  className={style.input_in_pag}{...register('sala', { valueAsNumber: true })}>
                    <option value="">Selecione um sala</option>
                    {salas.map((sala) => (
                        <option key={sala.id} value={sala.id}>
                            {sala.nome}
                        </option>
                    ))}
                </select>
                {errors.sala && <p className='error'>{errors.sala.message}</p>}

                <label className={style.label_in_pag}>Disciplina</label>
                <select  className={style.input_in_pag}{...register('disciplina', { valueAsNumber: true })}>
                    <option value="">Selecione uma disciplina</option>
                    {disciplinas.map((disciplina) => (
                        <option key={disciplina.id} value={disciplina.id}>
                            {disciplina.nome}
                        </option>
                    ))}
                </select>
                {errors.disciplina && <p className='error'>{errors.disciplina.message}</p>}

                <label className={style.label_in_pag}>Data de inicio</label>
                <input className={style.input_in_pag}
                    type="date"
                    {...register("data_inicio")} />
                {errors.data_inicio && <p className="error">{errors.data_inicio.message}</p>}

                <label className={style.label_in_pag}>Data de termino</label>
                <input className={style.input_in_pag}
                    type="date"
                    {...register("data_termino")} />
                {errors.data_termino && <p className="error">{errors.data_termino.message}</p>}

                <label className={style.label_in_pag}>Periodo</label>
                <select className={style.input_in_pag} {...register("periodo")}>
                    <option value=""> Selecione</option>
                    <option value="M"> Manhã</option>
                    <option value="T"> Tarde</option>
                    <option value="N"> Noite</option>
                </select>
                {errors.periodo && <p className='error'>{errors.periodo.message}</p>}

                <div>
                    <button className={style.button} type="submit">Cadastrar</button>
                </div>
            </form>
        </main></>
    );
}
