import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState, useEffect } from 'react';
import style from "./styles_register_and_edit.module.css"
import { Header } from "../../components/Header";

const schemasSala = z.object({
    nome: z.string()
        .min(1, 'Informe ao menos um caractere')
        .max(100, 'Informe até 100 caracteres'),


    tamanho: z.number()
        .int("Deve ser um número inteiro")
        .min(1, 'Informe ao menos um caractere')
        .max(100, 'Informe até 100 caracteres'),

    capacidade: z.number()
        .int("Deve ser um número inteiro")
        .min(1, 'Informe ao menos um caractere')
        .max(100, 'Informe até 100 caracteres'),

});
 
export function Classroom_Register() {
 
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schemasSala)
    });
 

 
    async function obterDadosFormulario(data) {
      console.log("Dados do formulário:", data);
        try {
            const token = localStorage.getItem('access_token');
 
            const response = await axios.post(
                'http://127.0.0.1:8000/api/sala/',
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
 
            console.log('sala cadastrada com sucesso!', response.data);
            alert('sala cadastrada com sucesso!');
            reset();
 
        } catch (error) {
            console.error('Erro ao cadastrar sala', error);
            alert("Erro ao cadastrar sala");
        }
    }
 
    return (
        <><Header />
        <main className={style.container_register_and_edit}>

            <form className={style.form_register} onSubmit={handleSubmit(obterDadosFormulario)}>
                <h2 className={style.title_register_and_edit}>Criar Sala</h2>
                <label className={style.label_in_pag}>Nome da sala</label>
                <input className={style.input_in_pag}
                    {...register("nome")}
                    placeholder="Sala" />
                {errors.nome && <p className='error'>{errors.nome.message}</p>}

                <label className={style.label_in_pag}>Capacidade de alunos</label>
                <input className={style.input_in_pag}
                    type="number"
                    {...register("capacidade", { valueAsNumber: true })}
                    placeholder="Capacidade de Alunos" />
                {errors.capacidade && <p className='error'>{errors.capacidade.message}</p>}

                <label className={style.label_in_pag}>Tamanho da sala</label>
                <input className={style.input_in_pag}
                    type="number"
                    {...register("tamanho", { valueAsNumber: true })}
                    placeholder="tamanho da sala" />
                {errors.tamanho && <p className='error'>{errors.tamanho.message}</p>}

                <div>
                    <button className={style.button} type="submit">
                        Cadastrar
                    </button>
                </div>
            </form>
        </main></>
    );
}
