import { useState } from 'react';
function LoginBox() {
	const [nome, setNome] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = (event) => {
		event.preventDefault()
		console.log('Nome:', nome)
		console.log('Email:', email)
		console.log('Password:', password)
		alert('Tentativa de cadastro/login!')
	}

	return (
		<div className='w-[400px] p-8 rounded-lg alt-dark-color-2-bg flex flex-col items-center shadow-lg'>
			<form onSubmit={handleSubmit} className='flex flex-col gap-5 w-full'>
				<div>
					<label htmlFor='nome' className='block text-left text-sm font-medium alt-light-color-text mb-2'>
						Nome
					</label>
					<input
						type='text'
						id='nome'
						value={nome}
						onChange={(e) => setNome(e.target.value)}
						required
						className='form-input main-dark-color-bg main-light-color-text'
					/>
				</div>

				<div>
					<label htmlFor='email' className='block text-left text-sm font-medium alt-light-color-text mb-2'>
						Email
					</label>
					<input
						type='email'
						id='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						className='form-input main-dark-color-bg main-light-color-text'
					/>
				</div>

				<div>
					<label htmlFor='password' className='block text-left text-sm font-medium alt-light-color-text mb-2'>
						Senha
					</label>
					<input
						type='password'
						id='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						className='form-input main-dark-color-bg main-light-color-text'
					/>
				</div>

				<button type='submit' className='submit-button main-light-color-text mt-4'>
					Enviar
				</button>
			</form>
		</div>
	)
}

export default LoginBox