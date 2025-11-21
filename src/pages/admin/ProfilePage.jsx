import ProfileIcon from "../../components/ProfileIcon"

function ProfilePage() {
    return (
        <div>
            <div className="flex flex-col items-center">
                <ProfileIcon />
                <h1 className="text-3xl">Fulano da Silva</h1>
                <p className="alt-light-color-text my-1">Ativo desde 09/02/2035</p>
                <p className="red-color-text cursor-pointer">Excluir conta</p>
            </div>
        </div>
    )
}

export default ProfilePage
