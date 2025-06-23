import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState, useEffect } from 'react';
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
        invalid_type_error: 'Informe a cargahorária'})
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
 
export function Subject_Register() {
 
    const [professores, setProfessores] = useState([]);
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
 
            const response = await axios.post(
                'http://127.0.0.1:8000/api/disciplina/',
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
 
            console.log('Disciplina cadastrado com sucesso!', response.data);
            alert('Disciplina cadastrado com sucesso!');
            reset();
 
        } catch (error) {
            console.error('Erro ao cadastrar disciplina', error);
            alert("Erro ao cadastrar disciplina");
        }
    }
 
    return (
        <><Header />
        <main className={style.container_register_and_edit}>
            <form  className={style.form_register} onSubmit={handleSubmit(obterDadosFormulario)}>
                <h2 className={style.title_register_and_edit}>Cadastro de Disciplina</h2>

                <label className={style.label_in_pag}>Nome da Disciplina</label>
                <input  className={style.input_in_pag} {...register('nome')} placeholder="Materia" />
                {errors.nome && <p className='error'>{errors.nome.message}</p>}

                <label className={style.label_in_pag}>Nome do curso</label>
                <input  className={style.input_in_pag} {...register('curso')} placeholder="Desenvolvimento de Sistema" />
                {errors.curso && <p className='error'>{errors.curso.message}</p>}

                <label className={style.label_in_pag}>Carga horária</label>
                <input className={style.input_in_pag} 
                    type="number"
                    {...register('carga_horario', { valueAsNumber: true })}
                    placeholder="75" />
                {errors.carga_horario && <p className='error'>{errors.carga_horario.message}</p>}

                <label className={style.label_in_pag}>Descrição</label>
                <textarea className={style.input_in_pag} 
                    {...register('descricao')}
                    placeholder="Descreva o curso com até 2000 caracteres"
                    rows={5} />
                {errors.descricao && <p className='error'>{errors.descricao.message}</p>}

                <label className={style.label_in_pag}>Professor</label>
                <select  className={style.input_in_pag} {...register('professor', { valueAsNumber: true })}>
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

                <div>
                    <button className={style.button} type="submit">Cadastrar</button>
                </div>
            </form>
        </main></>
    );
}
