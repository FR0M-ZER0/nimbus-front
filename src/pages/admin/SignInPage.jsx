import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { login } from '../../services/api'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../../store/slices/authSlice'
import PasswordInput from '../../components/PasswordInput'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { Link } from 'react-router'
import { CheckCircleIcon } from '@phosphor-icons/react'

function SignInPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            const { token, user } = await login(email, password)
            localStorage.setItem('authToken', token)

            dispatch(loginSuccess({ user, token }))
            navigate('/admin')
        } catch (err) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const original = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = original
        }
    }, [])

    return (
        <div className="flex min-h-screen w-screen">
            <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-10 gradient-dark-bg">
                <div className='flex flex-col justify-between h-full w-[600px]'>
                    <img src="/nimbus_logo.svg" alt="Nimbus Logo" className="h-16 mb-6" />

                    <div className='flex flex-col grow justify-center z-100'>
                        <div className='mb-8'>
                            <h1 className="text-3xl font-bold mb-2">Bem-vindo(a) de volta!</h1>
                            <p className='alt-light-color-text'>
                                Acesse a plataforma para continuar monitorando.
                            </p>
                        </div>

                        <form onSubmit={handleLogin} className="w-full space-y-6">
                            {error && (
                                <div className="bg-red-900/50 text-red-300 p-3 rounded-lg mb-6 text-center">
                                    {error}
                                </div>
                            )}

                            <label className="block mb-2 text-sm alt-light-color-text">Seu e-mail</label>
                            <input
                                type="email"
                                className="form-input"
                                placeholder="nome@exemplo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <label className="block mb-2 text-sm alt-light-color-text">Sua senha</label>
                            <div>
                                <PasswordInput
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <Link to={'/admin'}>
                                    <p className='text-sm green-color-text underline cursor-pointer'>
                                        Esqueceu sua senha?
                                    </p>
                                </Link>
                            </div>

                            <button 
                                type='submit'
                                className='submit-button w-full disabled:opacity-50 disabled:cursor-not-allowed mt-4'
                                disabled={isLoading}
                            > 
                                {isLoading ? 'Entrando...' : 'Entrar'} 
                            </button>
                            <p className='text-sm alt-light-color-text text-center'>Não possui uma conta? <span className='green-color-text'>Crie uma</span></p>
                        </form>
                    </div>

                </div>
            </div>

            <div className="hidden md:flex flex-col justify-center w-1/2 p-12 bg-black">
                <div className='h-full w-full'>
                    <h2 className="text-4xl font-semibold max-w-lg mb-6">
                        Monitore suas estações com precisão e inteligência
                    </h2>

                    <blockquote className="italic text-gray-100 max-w-md">
                        “Com o Nimbus, acompanhar vento, umidade, luminosidade e outros parâmetros críticos ficou simples e confiável. Alertas automáticos garantem que nenhuma anomalia passe despercebida.”
                    </blockquote>

                    <div className='space-y-4 mt-24'>
                        <p className='flex items-center'>
                            <CheckCircleIcon size={24} className='mr-2 green-color-text' />
                            Gerencie estações
                        </p> 
                        <p className='flex items-center'>
                            <CheckCircleIcon size={24} className='mr-2 green-color-text' />
                            Cadastre qualquer tipo de parâmetro
                        </p> 
                        <p className='flex items-center'>
                            <CheckCircleIcon size={24} className='mr-2 green-color-text' />
                            Crie alertas personalizados
                        </p> 
                        <p className='flex items-center'>
                            <CheckCircleIcon size={24} className='mr-2 green-color-text' />
                            Visualize os dados em tempo real
                        </p> 
                        <p className='flex items-center'>
                            <CheckCircleIcon size={24} className='mr-2 green-color-text' />
                            Gere relatórios
                        </p> 
                    </div>
                </div>

                <div className="flex justify-center items-center gap-3 mt-4 w-full absolute">
                    <div className='relative right-40'>
                        <DotLottieReact
                            src='/Globe.lottie'
                            autoplay
                            loop
                            className='w-[3200px]'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignInPage
