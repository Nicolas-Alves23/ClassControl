import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState, useEffect } from 'react';
import style from "./styles_register_and_edit.module.css"
import { Header } from "../../components/Header";

const schemasUser = z.object({
    username: z.string()
        .min(1, 'Informe ao menos um caractere')
        .max(100, 'Informe até 100 caracteres'),
    ni: z.number()
        .int("Deve ser um número inteiro")
        .min(1, 'Informe ao menos um caractere'),
    email: z.string()
        .min(1, 'Informe ao menos um caractere')
        .max(100, 'Informe até 100 caracteres'),
    telefone: z.string()
        .min(1, 'Informe ao menos um caractere')
        .max(23, 'Informe até 100 caracteres'),
    password: z.string()
        .min(8, 'A senha deve ter no mínimo 8 caracteres.')
        .regex(/[a-z]/, 'Deve conter ao menos uma letra minúscula.')
        .regex(/[A-Z]/, 'Deve conter ao menos uma letra maiúscula.')
        .regex(/[0-9]/, 'Deve conter ao menos um número.')
        .regex(/[^a-zA-Z0-9]/, 'Deve conter ao menos um caractere especial.'),
    tipo: z.string({
        invalid_type_error: 'Selecione um tipo'
    }).min(1, 'Selecione um tipo'),
    
    data_contratacao: z.string()
        .refine(val => !isNaN(Date.parse(val)), { message: "Data de contratação inválida" }),

    data_nascimento: z.string()
        .refine(val => !isNaN(Date.parse(val)), { message: "Data de nascimento inválida" }),

});

export function User_Register() {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schemasUser)
    });



    async function obterDadosFormulario(data) {
        console.log("Dados do formulário:", data);
        try {
            const token = localStorage.getItem('access_token');

            const response = await axios.post(
                'http://127.0.0.1:8000/api/usuario/',
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('usuário cadastrado com sucesso!', response.data);
            alert('usuário cadastrado com sucesso!');
            reset();

        } catch (error) {
            console.error('Erro ao cadastrar usuário', error);
            alert("Erro ao cadastrar usuário");
        }
    }

    return (
        <><Header />
        <main cclassName={style.container_register_and_edit}>

            <form className={style.form_register} onSubmit={handleSubmit(obterDadosFormulario)}>
                <h2 className={style.title_register_and_edit}>Criar Usuário</h2>
                <label className={style.label_in_pag}>Username</label>
                <input className={style.input_in_pag}
                    {...register("username")}
                    placeholder="Username" />
                {errors.username && <p className='error'>{errors.username.message}</p>}

                <label className={style.label_in_pag}>NI</label>
                <input className={style.input_in_pag}
                    type="number"
                    {...register("ni", { valueAsNumber: true })}
                    placeholder="ni" />
                {errors.ni && <p className='error'>{errors.ni.message}</p>}

                <label className={style.label_in_pag}>Email</label>
                <input className={style.input_in_pag}
                    {...register("email")}
                    placeholder="email" />
                {errors.email && <p className='error'>{errors.email.message}</p>}

                <label className={style.label_in_pag}>Telefone</label>
                <input className={style.input_in_pag}
                    type="tel"
                    {...register("telefone")}
                    placeholder="(99) 99999-9999" />
                {errors.telefone && <p className='error'>{errors.telefone.message}</p>}

                <label className={style.label_in_pag}>Senha</label>
                <input className={style.input_in_pag}
                    type="password"
                    {...register("password")}
                    placeholder="Mínimo de 6 caracteres" />
                {errors.password && <p className='error'>{errors.password.message}</p>}

                <label className={style.label_in_pag}>Data de contratação</label>
                <input className={style.input_in_pag}
                    type="date"
                    {...register("data_contratacao")} />
                {errors.data_contratacao && <p className="error">{errors.data_contratacao.message}</p>}

                <label className={style.label_in_pag}>Data de nascimento</label>
                <input className={style.input_in_pag}
                    type="date"
                    {...register("data_nascimento")} />
                {errors.data_nascimento && <p className="error">{errors.data_nascimento.message}</p>}


                <label className={style.label_in_pag}>Tipo de Usuário</label>
                <select  className={style.input_in_pag}{...register("tipo")}>
                    <option value="">Selecione o tipo</option>
                    <option value="P">Professor</option>
                    <option value="G">Gestor</option>
                </select>
                {errors.tipo && <p className='error'>{errors.tipo.message}</p>}

                <div>
                    <button className={style.button} type="submit">
                        Cadastrar
                    </button>
                </div>
            </form>
        </main></>
    );
}
