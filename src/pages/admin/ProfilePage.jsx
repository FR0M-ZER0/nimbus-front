import ProfileIcon from "../../components/ProfileIcon"
import UserEditForm from "../../components/UserEditForm"

function ProfilePage() {
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

                </div>
            </div>
        </div>
    )
}

export default ProfilePage
