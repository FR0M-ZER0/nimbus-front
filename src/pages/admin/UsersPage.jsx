import React, { useState, useEffect } from 'react';

const mockUsers = [
    { id: 1, name: 'Admin Principal', email: 'admin@tecsus.com.br' },
    { id: 2, name: 'João Bendito', email: 'joao.bendito@tecsus.com.br' },
    { id: 3, name: 'Maria Oliveira', email: 'maria.oliveira@tecsus.com.br' },
    { id: 4, name: 'Carlos Pereira', email: 'carlos.p@email.com' },
    { id: 5, name: 'Ana Souza', email: 'ana.souza@provedor.net' },
];

const api = {
    getUsers: async () => { await new Promise(resolve => setTimeout(resolve, 1000)); return [...mockUsers]; },
    addUser: async (userData) => { await new Promise(resolve => setTimeout(resolve, 500)); if (mockUsers.some(u => u.email === userData.email)) { throw new Error('Este e-mail já está em uso.'); } const newUser = { id: Date.now(), ...userData }; mockUsers.push(newUser); return newUser; },
    updateUser: async (userId, userData) => { await new Promise(resolve => setTimeout(resolve, 500)); if (mockUsers.some(u => u.email === userData.email && u.id !== userId)) { throw new Error('Este e-mail já está em uso por outro usuário.'); } const userIndex = mockUsers.findIndex(u => u.id === userId); if (userIndex === -1) throw new Error('Usuário não encontrado.'); mockUsers[userIndex] = { ...mockUsers[userIndex], ...userData }; return mockUsers[userIndex]; },
    deleteUser: async (userId) => { await new Promise(resolve => setTimeout(resolve, 500)); const userIndex = mockUsers.findIndex(u => u.id === userId); if (userIndex === -1) throw new Error('Usuário não encontrado.'); mockUsers.splice(userIndex, 1); return { success: true }; }
};

const Icon = ({ path }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d={path} />
    </svg>
);

const PencilIcon = () => <Icon path="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V12h2.293z" />;
const TrashIcon = () => <Icon path="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />;
const SearchIcon = () => <Icon path="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />;

const LoadingSpinner = () => (
    <div className="spinner-container">
        <div className="spinner"></div>
    </div>
);

function UserFormModal({ user, onSave, onCancel, apiError }) {
    const [formData, setFormData] = useState({ name: user?.name || '', email: user?.email || '', password: '' });
    const isEditing = !!user;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSave = { name: formData.name, email: formData.email };
        if (!isEditing || formData.password) {
            dataToSave.password = formData.password;
        }
        onSave(dataToSave);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content alt-dark-color-2-bg">
                <h2 className="main-light-color-text modal-title">{isEditing ? 'Editar Usuário' : 'Adicionar Usuário'}</h2>
                <form onSubmit={handleSubmit}>
                    {apiError && <div className="error-message">{apiError}</div>}
                    <div className="form-group">
                        <label className="alt-light-color-text">Nome:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-input main-light-color-text" />
                    </div>
                    <div className="form-group">
                        <label className="alt-light-color-text">E-mail:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="form-input main-light-color-text" />
                    </div>
                    <div className="form-group">
                        <label className="alt-light-color-text">Senha:</label>
                        <input type="password" name="password" placeholder={isEditing ? 'Deixe em branco para não alterar' : ''} value={formData.password} onChange={handleChange} required={!isEditing} className="form-input main-light-color-text" />
                    </div>
                    <div className="modal-actions">
                        <button type="button" onClick={onCancel} className="cancel-button">Cancelar</button>
                        <button type="submit" className="submit-button">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function UsersPage() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [modalError, setModalError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    // --- Lógica de Dados e API Handlers ---
    const fetchUsers = async () => {
        setIsLoading(true);
        setError('');
        try {
            const data = await api.getUsers();
            setUsers(data);
        } catch (err) {
            setError('Falha ao carregar usuários. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
            try {
                await api.deleteUser(userId);
                showSuccessMessage('Usuário excluído com sucesso!');
                fetchUsers();
            } catch (err) {
                setError(`Erro ao excluir usuário: ${err.message}`);
            }
        }
    };

    const handleSaveUser = async (userData) => {
        try {
            if (currentUser) {
                await api.updateUser(currentUser.id, userData);
                showSuccessMessage('Usuário atualizado com sucesso!');
            } else {
                await api.addUser(userData);
                showSuccessMessage('Usuário criado com sucesso!');
            }
            handleCloseModal();
            fetchUsers();
        } catch (err) {
            setModalError(err.message);
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const showSuccessMessage = (message) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const handleOpenAddModal = () => {
        setModalError('');
        setCurrentUser(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (user) => {
        setModalError('');
        setCurrentUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    return (
        <div className="users-page-container w-full">
            <div className="page-header">
                <h1>Gerenciamento de Usuários</h1>
            </div>

            <div className="actions-container">
                <div className="search-container">
                    <span className="search-icon"><SearchIcon /></span>
                    <input
                        type="text"
                        placeholder="Pesquisar por nome ou e-mail..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button onClick={handleOpenAddModal} className="submit-button">
                    Adicionar Usuário
                </button>
            </div>

            {successMessage && <div className="message-container"><div className="success-message">{successMessage}</div></div>}
            {error && <div className="message-container"><div className="error-message">{error}</div></div>}

            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td className="actions-cell">
                                    <button onClick={() => handleOpenEditModal(user)} className="action-button" title="Editar"><PencilIcon /></button>
                                    <button onClick={() => handleDeleteUser(user.id)} className="action-button delete" title="Excluir"><TrashIcon /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {isModalOpen && (
                <UserFormModal
                    user={currentUser}
                    onSave={handleSaveUser}
                    onCancel={handleCloseModal}
                    apiError={modalError}
                />
            )}
        </div>
    );
}

export default UsersPage;