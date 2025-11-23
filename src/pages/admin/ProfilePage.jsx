import ProfileIcon from "../../components/ProfileIcon"
import UserEditForm from "../../components/UserEditForm"
import StationsCreatedTable from "../../components/StationsCreatedTable"
import StationImage from "../../assets/station_image.svg"
import { useDispatch, useSelector } from "react-redux"
import { formatISOToBR } from "../../utils/format"
import loadingAnimation from '../../assets/loading.gif'
import api from "../../api/api"
import { useNavigate } from "react-router"
import { logout } from "../../store/slices/authSlice"

function ProfilePage() {
    const user = useSelector(state => state.auth.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleDelete = async () => {
        try {
            const confirmation = confirm('Deseja excluir sua conta? Esta ação não pode ser revertida')

            if (confirmation) {
                await api.delete(`/user/${user.id_usuario}`)
                dispatch(logout())
                navigate('/signin')
            }
        } catch(err) {
            console.error(err)
        }
    }

    const stations = [
        {
            image: StationImage,
            uid: 'abc123',
            name: 'Ulmidade da água',
            params: ['ulmidade, luz, chuva']
        },
        {
            image: StationImage,
            uid: 'xyz123',
            name: 'Temperatura do solo',
            params: ['temperatura']
        },
        {
            image: StationImage,
            uid: 'uia598',
            name: 'Velocidade do vento',
            params: ['veloc, vento']
        },
        {
            image: StationImage,
            uid: 'fla791',
            name: 'Nível de luz',
            params: ['luz, chuva']
        },
    ]

    return (
        <div className="w-full pb-8">
            {
                user ? (
                    <>
                        <div className="flex flex-col items-center mb-8">
                            <ProfileIcon />
                            <h1 className="text-3xl">{user.nome}</h1>
                            <p className="alt-light-color-text my-1">Ativo desde { formatISOToBR(user.data_criacao) }</p>
                            <p className="red-color-text cursor-pointer" onClick={handleDelete}>Excluir conta</p>
                        </div>

                        <div className="flex justify-between">
                            <div className="w-[59%]">
                                <UserEditForm user={user} />
                            </div>

                            <div className="w-[39%]">
                                <StationsCreatedTable stations={stations} />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex w-full h-screen justify-center items-center">
                        <img src={loadingAnimation} alt="loading" width={160} />
                    </div>
                )
            }

        </div>
    )
}

export default ProfilePage
