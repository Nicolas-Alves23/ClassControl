import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import style from './styles_register_and_edit.module.css';
import { Header } from "../../components/Header";
 
const schemaClassroom = z.object({
    nome: z.string()
        .min(1, 'Informe ao menos um caractere')
        .max(100, 'Informe até 100 caracteres'),
        
    capacidade: z.number()
        .int("Deve ser um número inteiro")
        .min(1, 'Informe ao menos um caractere')
        .max(100, 'Informe até 100 caracteres'),

    tamanho: z.number()
        .int("Deve ser um número inteiro")
        .min(1, 'Informe ao menos um caractere')
        .max(100, 'Informe até 100 caracteres'),
});
 
export function Classroom_edit() {
    const[sala, setSala] = useState([])
    const { id } = useParams();
    const navigate = useNavigate();
 
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schemaClassroom)
    });
 
    useEffect(() => {
        async function buscarSala() {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get(`http://127.0.0.1:8000/api/sala/${id}/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setSala(response.data);
                reset(response.data); // Agora sim: response.data é o objeto da sala

            } catch (error) {
                console.error("Erro ao carregar a sala", error);
            }
        }

        buscarSala();
    }, [id, reset]);
 
    async function obterDadosFormulario(data) {
      console.log("Dados do formulário:", data);
        try {
            const token = localStorage.getItem('access_token');
 
            const response = await axios.put(
                `http://127.0.0.1:8000/api/sala/${id}/`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
 
            console.log('Sala atualizada com sucesso!', response.data);
            alert('Sala atualizada com sucesso!');
            reset();
            navigate('/home');
 
        } catch (error) {
            console.error('Erro ao cadastrar sala', error);
            alert("Erro ao cadastrar sala");
        }
    }
 
    return (
        <><Header />
        <main className={style.container_register_and_edit}>

            <form className={style.form_register} onSubmit={handleSubmit(obterDadosFormulario)}>
                <h2 className={style.title_register_and_edit}>Editar Sala</h2>
                <label className={style.label_in_pag}>Nome da sala</label>
                <input className={style.input_in_pag}
                    {...register('nome')}
                    placeholder="Sala" />
                {errors.nome && <p className={style.error}>{errors.nome.message}</p>}


                <label className={style.label_in_pag}>Capacidade de alunos</label>
                <input className={style.input_in_pag}
                    type="number"
                    {...register('capacidade', { valueAsNumber: true })}
                    placeholder="Capacidade de Alunos" />
                {errors.capacidade && <p className={style.error}>{errors.capacidade.message}</p>}


                <label className={style.label_in_pag}>Tamanho da sala</label>
                <input className={style.input_in_pag}
                    type="number"
                    {...register("tamanho", { valueAsNumber: true })}
                    placeholder="tamanho da sala" />
                {errors.tamanho && <p className='error'>{errors.tamanho.message}</p>}
                <div>
                    <button  className={style.button} type="submit">
                        Cadastrar
                    </button>
                </div>
            </form>
        </main></>
    );
}