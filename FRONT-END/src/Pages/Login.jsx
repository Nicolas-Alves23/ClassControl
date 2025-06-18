import style from './Login.module.css'
import Lapis from '../img/Lapis.jpg'
import axios from 'axios'
//A junção dessas 3 bibliotecas faz a validação
//do formulario, eles são tipo uma venda casada,
//um funciona baseado no outro
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'


const schemaLogin = z.object({
    username: z.string()
        .min(1, 'informe o seu usuário')
        .max(30, 'informe no máximo 30 caracteres'),

    password: z.string()
        .min(1, 'informe o seu usuário')
        .max(30, 'informe no máximo 30 caracteres'),
})
export function Login() {
    
    const navigate = useNavigate()
    // registra todas as informações do usuário que são dadas
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm(
        { resolver: zodResolver(schemaLogin) }
    );
    async function ObterDados(data) {
        console.log(`Dados ${data}`)
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', {
                username: data.username,
                password: data.password
            });
            const { access, refresh, user } = response.data

            localStorage.setItem('access_token', access)
            localStorage.setItem('refresh_token', refresh)
            localStorage.setItem('tipo', user.tipo)
            localStorage.setItem('username', user.username)
            console.log("Login efetuado")
            navigate('/home')
        } catch (error) {
            console.error('deu ruim', error)
            alert("dados inválida")
        }

    }
    return (

        <main className={style.pag_login}>

            <img src={Lapis} alt="Alguns Lápis de cor dentro de um copo preto" className={style.img_login} />
            <div className={style.back_the_login}>
                <div className={style.text_title_log}>
                    <h2>LOG-IN</h2>
                </div>

                <div className={style.two_inputs}>
                    <form onSubmit={handleSubmit(ObterDados)}>
                        <div className={style.box_inputs}>
                            <div className={style.form__group}>
                                <input {...register('username')} type="input" className={style.form__field} placeholder="Name" required="" />
                                {errors.username && <p>{errors.username.message}</p>}
                                <label for="name" className={style.form__label}>Nome do Usuário</label>
                            </div>
                        </div>
                        <div className={style.box_inputs}>
                            <div className={style.form__group}>
                                <input {...register('password')} type="password" className={style.form__field} placeholder="Name" required="" />
                                {errors.password && <p>{errors.password.message}</p>}
                                <label for="name" className={style.form__label}>Senha</label>
                            </div>
                        </div>
                        <button className={style.botao_logar}>
                            Login
                        </button>
                    </form>
         
                </div>
            </div>


        </main >
    )
}