import { Link, useLocation } from "react-router"
import {
	HouseIcon,
	CircuitryIcon,
	WarningIcon,
	NewspaperIcon,
	UsersIcon,
	UserIcon,
	GearIcon,
	SignOutIcon,
} from "@phosphor-icons/react"

function Sidebar() {
	const location = useLocation();

	const links = [
		{ to: "/admin", label: "Dashboard", icon: <HouseIcon size={28} /> },
		{
		to: "/admin/stations",
		label: "Estações",
		icon: <CircuitryIcon size={28} />,
		},
		{ to: "/admin/alerts", label: "Alertas", icon: <WarningIcon size={28} /> },
		{
		to: "/admin/logs",
		label: "Histórico",
		icon: <NewspaperIcon size={28} />,
		},
		{ to: "/admin/users", label: "Usuários", icon: <UsersIcon size={28} /> },
	]

	const accountLinks = [
		{ to: "/admin/profile", label: "Perfil", icon: <UserIcon size={28} /> },
		{
		to: "/admin/settings",
		label: "Configurações",
		icon: <GearIcon size={28} />,
		},
	]

	const isActive = (path) => location.pathname === path

	return (
		<nav className="p-[20px] md:flex flex-col min-h-screen w-[300px] dark-gradient hidden zoom-08">
			<div className="flex w-full justify-center">
				<img src="/nimbus_logo.svg" alt="logo" width={140} />
			</div>

			<div className="flex flex-col mt-[50px]">
				{links.map(({ to, label, icon }) => (
					<Link
						key={to}
						to={to}
						className={`flex items-center mb-2 p-2 hover:bg-[#9093B4] rounded transition-all duration-200 ease-in-out ${
						isActive(to) ? "alt-light-color-bg" : ""
						}`}
					>
						{icon}
						<span className="ml-4">{label}</span>
					</Link>
				))}

				<p className="px-2 mt-[44px] mb-4">Conta</p>

				{accountLinks.map(({ to, label, icon }) => (
					<Link
						key={to}
						to={to}
						className={`flex items-center mb-2 p-2 hover:bg-[#9093B4] rounded transition-all duration-200 ease-in-out ${
						isActive(to) ? "alt-light-color-bg" : ""
						}`}
					>
						{icon}
						<span className="ml-4">{label}</span>
					</Link>
				))}

				{/* TODO: Sign out não precisa ser link */}
				<button className="flex items-center p-2 hover:bg-[#9093B4] rounded transition-all duration-200 ease-in-out w-full text-left">
					<SignOutIcon size={28} />
					<span className="ml-4">Sair</span>
				</button>
			</div>
		</nav>
	)
}

export default Sidebar
