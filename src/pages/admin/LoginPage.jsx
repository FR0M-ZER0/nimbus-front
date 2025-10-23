import { useNavigate } from 'react-router';
import { registerFirstUser } from '../../services/api';

function LoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // FUNÇÃO CORRIGIDA
    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // "Traduz" os nomes dos campos para o que o backend espera
        const dataToSend = {
            nome: formData.name,
            email: formData.email,
            senha: formData.password,
            id_nivel_acesso: 1 // Adiciona o nível de acesso de Admin (geralmente ID 1)
        };

        try {
            // Envia o objeto corrigido para a API
            await registerFirstUser(dataToSend);
            
            localStorage.setItem('hasAdminBeenCreated', 'true');
            alert('Administrador criado com sucesso! Você será redirecionado para a tela de login.');
            navigate('/signin');

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen w-screen gradient-dark-bg main-light-color-text'>
            <div className='flex flex-col items-center gap-8 w-full max-w-sm px-4'>
                <img src='/nimbus_logo.svg' alt='Nimbus Logo' className='h-24 w-auto mb-4' />
                <div className='text-center'>
                    <h1 className='text-3xl font-semibold mb-1'>Bem-vindo(a) à Nimbus</h1>
                    <p className='text-md alt-light-color-text'>
                        Crie o primeiro usuário administrador do sistema.
                    </p>
                </div>

                <form onSubmit={handleRegister} className='w-full'>
                    {error && (
                        <div className='bg-red-900/50 text-red-300 p-3 rounded-lg mb-6 text-center'>
                            {error}
                        </div>
                    )}
                    <div className='mb-6'>
                        <label htmlFor='name' className='block mb-2 text-sm font-medium alt-light-color-text'>Nome Completo</label>
                        <input type='text' id='name' name='name' value={formData.name} onChange={handleChange} className='form-input main-light-color-text' required />
                    </div>
                    <div className='mb-6'>
                        <label htmlFor='email' className='block mb-2 text-sm font-medium alt-light-color-text'>E-mail</label>
                        <input type='email' id='email' name='email' value={formData.email} onChange={handleChange} className='form-input main-light-color-text' required />
                    </div>
                    <div className='mb-6'>
                        <label htmlFor='password' className='block mb-2 text-sm font-medium alt-light-color-text'>Senha</label>
                        <input type='password' id='password' name='password' value={formData.password} onChange={handleChange} className='form-input main-light-color-text' required />
                    </div>
                    <button type='submit' className='submit-button w-full main-light-color-text' disabled={isLoading}>
                        {isLoading ? 'Criando...' : 'Criar Administrador'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;