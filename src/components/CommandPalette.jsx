import { useNavigate } from "react-router"
import { useState, useEffect } from "react"
import { ArrowUUpRightIcon } from "@phosphor-icons/react"

const searchItems = [
    { label: "Dashboard", description: "Resumo geral", to: "/admin" },
    { label: "Estações", description: "Gerenciar estações", to: "/admin/stations" },
    { label: "Alertas", description: "Gerenciar alertas", to: "/admin/alerts" },
    { label: "Histórico", description: "Auditoria de ações", to: "/admin/logs" },
    { label: "Usuários", description: "Gerenciar usuários", to: "/admin/users" },
    { label: "Relatórios", description: "Gerar análises", to: "/admin/reports" },
    { label: "Perfil", description: "Suas informações", to: "/admin/profile" },
    { label: "Configurações", description: "Preferências do sistema", to: "/admin/settings" },
]

function CommandPalette({ open, onClose }) {
    const navigate = useNavigate()
    const [query, setQuery] = useState("")

    useEffect(() => {
        const handler = (e) => e.key === "Escape" && onClose()
        window.addEventListener("keydown", handler)
        return () => window.removeEventListener("keydown", handler)
    }, [])

    const filtered = searchItems.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
    )

    if (!open) return null

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-start pt-[10vh] z-50" onClick={onClose}>
            <div className="bg-[#1b1b2a] w-[600px] rounded-xl p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
                <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar no sistema"
                    className="w-full p-3 rounded-lg bg-[#2b2b40] outline-none"
                />

                <div className="mt-4 max-h-[300px] overflow-y-auto">
                    {filtered.length === 0 && (
                        <p className="text-gray-400 text-center py-6">Nada encontrado</p>
                    )}

                    {filtered.map((item, i) => (
                        <div
                            key={i}
                            onClick={() => {
                                navigate(item.to)
                                onClose()
                            }}
                            className="p-3 rounded-lg hover:bg-[#3b3b5c] cursor-pointer transition flex justify-between items-center"
                        >
                            <div>
                                <p className="text-white text-lg">{item.label}</p>
                                <p className="text-sm text-gray-300">{item.description}</p>
                            </div>
                            
                            <ArrowUUpRightIcon size={24} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CommandPalette
