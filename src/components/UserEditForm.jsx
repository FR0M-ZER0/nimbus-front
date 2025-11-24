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
	const [curPwd, setCurPwd] = useState('')
	const [newPwd, setNewPwd] = useState('')
	const [pwdConfirmation, setPwdConfirmation] = useState('')

	const handleProfileUpdate = async () => {
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

	const handlePasswordUpdate = async () => {
		const data = {
			current_password: curPwd,
			new_password: newPwd,
			password_confirmation: pwdConfirmation
		}

		try {
			await api.put(`/user/password/${user.id_usuario}`, data)
			setCurPwd('')
			setNewPwd('')
			setPwdConfirmation('')
			toast.success('Senha atualizada com sucesso!')
		} catch(err) {
			console.error(err)
		}
	}

    return (
        <Card title={'Dados pessoais'}>
            <div>
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

					<button className='submit-button mt-8' onClick={handleProfileUpdate}>
						Salvar
					</button>
				</div>

				<div>
					<h2 className="text-3xl mb-8">Senha</h2>
					<div className="grid grid-cols-6 gap-x-4 gap-y-8">
						<div className='col-span-3'>
							<label className='alt-light-color-text mb-2'>Senha atual</label>
							<PasswordInput value={curPwd} onChange={e => setCurPwd(e.target.value)} />
						</div>

						<div className='col-span-3'>
							<label className='alt-light-color-text mb-2'>Nova senha</label>
							<PasswordInput value={newPwd} onChange={e => setNewPwd(e.target.value)} />
						</div>

						<div className='col-span-3'>
							<label className='alt-light-color-text mb-2'>Confirmar nova senha</label>
							<PasswordInput value={pwdConfirmation} onChange={e => setPwdConfirmation(e.target.value)} />
						</div>
					</div>

					<button className='submit-button mt-8' onClick={handlePasswordUpdate}>
						Atualizar
					</button>
				</div>
            </div>
        </Card>
    )
}

export default UserEditForm