import { useState } from "react"
import Card from "./Card"
import PasswordInput from "./PasswordInput"
import api from "../api/api"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { updateUser } from '../store/slices/authSlice'

function UserEditForm({ user }) {
	const dispatch = useDispatch()
	const [name, setName] = useState(user.nome)
	const [email, setEmail] = useState(user.email)
	const [role, setRole] = useState(user.nivel_acesso.id_nivel_acesso)

	const handleProfileUpdate = async (e) => {
		e.preventDefault()
		const data = {
			nome: name,
			email,
			id_nivel_acesso: Number(role)
		}
		try {
			const response = await api.put(`/user/${user.id_usuario}`, data)
			dispatch(updateUser(response.data))
			toast.success('Perfil atualizado com sucesso')
		} catch (err) {
			console.error(err)
		}
	}
    return (
        <Card title={'Dados pessoais'}>
            <form onSubmit={handleProfileUpdate}>
				<div className="mb-24">
					<div className="grid grid-cols-6 gap-x-4 gap-y-8">
						<div className='col-span-3'>
							<label className='alt-light-color-text mb-2' htmlFor="">Nome</label>
							<input type="text" className='form-input' value={name} onChange={e => setName(e.target.value)} />
						</div>

						<div className='col-span-3'>
							<label className='alt-light-color-text mb-2' htmlFor="">Email</label>
							<input type="text" className='form-input' value={email} onChange={e => setEmail(e.target.value)} />
						</div>
						
						<div className="col-span-3">
							<label className='alt-light-color-text mb-2' htmlFor="">Estado</label>
							<select
								id="estado"
								className='form-input'
								value={role}
								onChange={e => setRole(e.target.value)}
							>
								<option value={1} className='alt-dark-color-3-bg'>Administrador</option>
								<option value={2} className='alt-dark-color-3-bg'>Público</option>
							</select>
						</div>
					</div>

					<button className='submit-button mt-8'>
						Salvar
					</button>
				</div>

				<div>
					<h2 className="text-3xl mb-8">Senha</h2>
					<div className="grid grid-cols-6 gap-x-4 gap-y-8">
						<div className='col-span-3'>
							<label className='alt-light-color-text mb-2'>Senha atual</label>
							<PasswordInput />
						</div>

						<div className='col-span-3'>
							<label className='alt-light-color-text mb-2'>Nova senha</label>
							<PasswordInput />
						</div>

						<div className='col-span-3'>
							<label className='alt-light-color-text mb-2'>Confirmar nova senha</label>
							<PasswordInput />
						</div>
					</div>

					<button className='submit-button mt-8'>
						Atualizar
					</button>
				</div>
            </form>
        </Card>
    )
}

export default UserEditForm