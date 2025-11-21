import { useState } from "react"
import Card from "./Card"
import PasswordInput from "./PasswordInput"

function UserEditForm() {
    return (
        <Card title={'Dados pessoais'}>
            <form action="">
				<div className="mb-12">
					<div className="grid grid-cols-6 gap-x-4 gap-y-8">
						<div className='col-span-3'>
							<label className='alt-light-color-text mb-2' htmlFor="">Nome</label>
							<input type="text" className='form-input' />
						</div>

						<div className='col-span-3'>
							<label className='alt-light-color-text mb-2' htmlFor="">Email</label>
							<input type="text" className='form-input' />
						</div>
						
						<div className='col-span-3'>
							<label className='alt-light-color-text mb-2' htmlFor="">Acesso</label>
							<input type="number" className='form-input' />
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
						Salvar
					</button>
				</div>
            </form>
        </Card>
    )
}

export default UserEditForm