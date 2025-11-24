import { useDispatch, useSelector } from "react-redux"
import Card from "../../components/Card"
import Checkbox from "../../components/Checkbox"
import PasswordInput from "../../components/PasswordInput"
import { setTheme } from "../../store/slices/themeSlice"

function SettingsPage() {
    const dispatch = useDispatch()
    const theme = useSelector(state => state.theme.mode)

    const handleThemeToggle = (enabled) => {
        dispatch(setTheme(enabled ? 'light' : 'dark'))
    }

    return (
        <div className="w-full">
            <div className="flex justify-between">
                <div className="w-[49%]">
                    <Card title={'Visual'}>
                        <div className="flex flex-col gap-4">
                            <Checkbox label="Habilitar alto contraste entre os componentes" />
                            <Checkbox
                                label="Habilitar tema claro"
                                defaultChecked={theme === 'light'}
                                onToggle={handleThemeToggle}
                            />
                        </div>

                        <div className="mt-12">
                            <p className="text-3xl mb-8">Notificações</p>
                            <div className="flex flex-col gap-4">
                                <Checkbox label="Receber alertas em meu email" />
                                <Checkbox label="Receber notificações do sistema em meu email" />
                                <Checkbox label="Receber relatórios das estações em meu email" />
                            </div>
                        </div>

                        <div className="mt-12">
                            <p className="text-3xl mb-8">Segurança</p>
                            <div className="flex flex-col gap-4">
                                <Checkbox label="Ativar verificação de duas etapas (Um email será enviado toda vez que fizer login" />
                                <p className="cursor-pointer green-color-text underline">Desconectar-me de todos os dispositivos</p>
                            </div>
                        </div>

                        <div className="mt-12">
                            <p className="text-3xl mb-8">Integrações</p>
                            <div className="flex flex-col gap-4">
                                <div>
                                    <label className='alt-light-color-text mb-2'>Secret Key para acesso à API</label>
                                    <PasswordInput value='abc12312938fsaçjl1f9a8fjasd09f8' />
                                </div>

                                <div>
                                    <label className='alt-light-color-text mb-2' htmlFor="">URL Webhook</label>
                                    <input type="text" className='form-input' value='https://nimbus.dev/webhook/faspodfiasdl1-20983-adk109da-ad091kbnm' />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="w-[49%]">
                    <Card title='Sistema'>
                        <div className="flex flex-col gap-4">
                            <Checkbox label="Habilitar atualização automática dos dados no dashboard inicial" />

                            <div>
                                <label className='alt-light-color-text mb-2' htmlFor="">Tempo de atualização dos dados no dashboard inicial</label>
                                <input type="text" className='form-input' style={{width: 84}} value={'2000 ms'} />
                            </div>

                            <div>
                                <label className='alt-light-color-text mb-2' htmlFor="">Tempo de atualização dos logs na página de histórico</label>
                                <input type="text" className='form-input' style={{width: 84}} value={'2000 ms'} />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default SettingsPage
