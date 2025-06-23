import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import style from "./styles_register_and_edit.module.css"
import { Header } from "../../components/Header";

const schemaDisciplina = z.object({
    nome: z.string()
        .min(1, 'Informe ao menos um caractere')
        .max(100, 'Informe até 100 caracteres'),
    curso: z.string()
        .min(1, 'Informe ao menos um caractere')
        .max(100, 'Informe até 100 caracteres'),
    carga_horario: z.number({
        invalid_type_error: 'Informe a cargahorária'
    })
        .int("Deve ser um número inteiro")
        .min(1, "A carga horária mínima é 1 hora")
        .max(260, "A carga horária máxima é 260 horas"),
    descricao: z.string()
        .min(1, 'Informe ao menos um caractere')
        .max(300, 'Informe até 300 caracteres'),
    professor: z.number({
        invalid_type_error: 'Selecione um professor'
    }).min(1, 'Selecione um professor')
});

export function Subject_Edit() {

    const [professores, setProfessores] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schemaDisciplina)
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
                console.log(response.data)
                console.log("Token:", token);
                console.log("ID da disciplina:", id);
                console.log("URL da requisição:", `http://127.0.0.1:8000/api/disciplina/${id}/`);

                //Preenche o formulários com os dados do registro do ID
                const resDisciplina = await axios.get(`http://127.0.0.1:8000/api/disciplina/${id}/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                });
                console.log("Segunda etapa feita")
                // Preenche o formulário
                reset(resDisciplina.data);

            } catch (error) {
                console.error("Erro ao carregar professores", error);
            }

        }
        buscarProfessores();
    }, []);

    async function obterDadosFormulario(data) {
        console.log("Dados do formulário:", data);
        try {
            const token = localStorage.getItem('access_token');

            const response = await axios.put(
                `http://127.0.0.1:8000/api/disciplina/${id}/`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('Disciplina Atualizado com sucesso!', response.data);
            alert('Disciplina Atualizado com sucesso!');
            reset();
            navigate('/home');

        } catch (error) {
            console.error('Erro ao Atualizado disciplina', error);
            alert("Erro ao Atualizado disciplina");
        }
    }

    return (
        <><Header />
        <main className={style.container_register_and_edit}>

            <form className={style.form_register} onSubmit={handleSubmit(obterDadosFormulario)}>
                <h2 className={style.title_register_and_edit}>Editar de Disciplina</h2>
                <label className={style.label_in_pag}>Nome da Disciplina</label>
                <input className={style.input_in_pag}

                    {...register('nome')}
                    placeholder="Materia" />
                {errors.nome && <p className={estilos.error}>{errors.nome.message}</p>}


                <label className={style.label_in_pag}>Nome do curso</label>
                <input className={style.input_in_pag}

                    {...register('curso')}
                    placeholder="Desenvolvimento de Sistema" />
                {errors.curso && <p className={estilos.error}>{errors.curso.message}</p>}


                <label className={style.label_in_pag}>Carga horária</label>
                <input className={style.input_in_pag}
                    type="number"

                    {...register('carga_horario', { valueAsNumber: true })}
                    placeholder="100" />
                {errors.carga_horario &&
                    <p>
                        {errors.carga_horario.message}
                    </p>}


                <label className={style.label_in_pag}>Descrição</label>
                <textarea className={style.input_in_pag}
                    {...register('descricao')}
                    placeholder="Descreva o curso com até 2000 caracteres"
                    rows={5} />
                {errors.descricao && <p>{errors.descricao.message}</p>}

                <label className={style.label_in_pag}>Professor</label>
                <select className={style.input_in_pag}
                    {...register('professor', { valueAsNumber: true })}>
                    <option value="">Selecione um professor</option>
                    {professores.map((prof) => (
                        <option key={prof.id} value={prof.id}>
                            {prof.username}
                        </option>
                    ))}
                </select>
                {errors.professor && <p className={estilos.error}>{errors.professor.message}</p>}

                <div>
                    <button className={style.button} type="submit">
                        Cadastrar
                    </button>
                </div>
            </form>
        </main></>
    );
}