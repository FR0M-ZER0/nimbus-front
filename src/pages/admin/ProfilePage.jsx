import ProfileIcon from "../../components/ProfileIcon"
import UserEditForm from "../../components/UserEditForm"
import StationsCreatedTable from "../../components/StationsCreatedTable"
import StationImage from "../../assets/station_image.svg"

function ProfilePage() {
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
            <div className="flex flex-col items-center mb-8">
                <ProfileIcon />
                <h1 className="text-3xl">Fulano da Silva</h1>
                <p className="alt-light-color-text my-1">Ativo desde 09/02/2035</p>
                <p className="red-color-text cursor-pointer">Excluir conta</p>
            </div>

            <div className="flex justify-between">
                <div className="w-[59%]">
                    <UserEditForm />
                </div>

                <div className="w-[39%]">
                    <StationsCreatedTable stations={stations} />
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
