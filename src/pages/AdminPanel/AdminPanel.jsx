// src/pages/AdminPanel/AdminPanel.jsx
import React, { useState } from 'react';
import './AdminPanel.css';

export const AdminPanel = () => {
  // Состояние аутентификации (демо-режим)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Состояние пользователей
  const [users, setUsers] = useState([
    { id: 1, name: 'Иван Петров', role: 'Администратор', email: 'ivan.petrov@davs.ru', lastActive: 'Сегодня, 14:32' },
    { id: 2, name: 'Мария Сидорова', role: 'Редактор', email: 'maria.sidorova@davs.ru', lastActive: 'Сегодня, 13:15' },
    { id: 3, name: 'Алексей Смирнов', role: 'Пользователь', email: 'alexey.smirnov@davs.ru', lastActive: 'Вчера, 18:45' },
  ]);

  // Состояние поиска
  const [searchQuery, setSearchQuery] = useState('');

  // Состояние модального окна
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Пользователь' });

  // Фильтрация пользователей по поиску
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Обработчики модального окна
  const openAddModal = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '', role: 'Пользователь' });
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  // CRUD операции
  const handleSaveUser = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    if (editingUser) {
      // Редактирование
      setUsers(users.map(u => 
        u.id === editingUser.id ? { ...u, ...formData } : u
      ));
    } else {
      // Добавление
      const newUser = {
        id: Date.now(),
        ...formData,
        lastActive: 'Только что'
      };
      setUsers([...users, newUser]);
    }
    closeModal();
  };

  const handleDelete = (userId) => {
    if (window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  const getRoleStyle = (role) => {
    switch(role) {
      case 'Администратор':
        return { className: 'role-badge role-admin', text: 'Администратор' };
      case 'Редактор':
        return { className: 'role-badge role-editor', text: 'Редактор' };
      default:
        return { className: 'role-badge role-user', text: 'Пользователь' };
    }
  };

  // Экран подтверждения доступа (Демо)
  if (!isAuthenticated) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <h2 className="login-title">Панель Администратора</h2>
          <p className="login-subtitle">Демонстрационный режим. Введите любые данные или нажмите кнопку ниже для входа без пароля.</p>
          
          <div className="form-group">
            <label className="form-label">Пароль (демо)</label>
            <input type="password" className="search-input" placeholder="••••••••" disabled />
          </div>

          <button className="btn-primary btn-full" onClick={() => setIsAuthenticated(true)}>
            Войти в систему
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-container">
        {/* Header */}
        <div className="admin-header">
          <div className="header-content">
            <h1 className="admin-title">Администрирование</h1>
            <p className="admin-subtitle">Управление пользователями и их правами доступа</p>
          </div>
          <div className="header-stats">
            <div className="stat-card">
              <div className="stat-value">{users.length}</div>
              <div className="stat-label">Пользователей</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{users.filter(u => u.lastActive.includes('Сегодня')).length}</div>
              <div className="stat-label">Онлайн сегодня</div>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="actions-bar">
          <div className="search-box">
            <svg className="search-icon" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="7.5" cy="7.5" r="6" stroke="#9ca3af" strokeWidth="1.5"/>
              <path d="M12 12L16 16" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input 
              type="text" 
              placeholder="Поиск по имени, почте или роли..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button onClick={openAddModal} className="btn-primary btn-add">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 4.5V13.5M4.5 9H13.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            Добавить пользователя
          </button>
        </div>

        {/* Table */}
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th className="th-user">Пользователь</th>
                <th className="th-role">Роль</th>
                <th className="th-status">Статус</th>
                <th className="th-actions">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => {
                  const roleStyle = getRoleStyle(user.role);
                  return (
                    <tr key={user.id} className="table-row">
                      <td className="td-user">
                        <div className="user-info">
                          <div className="user-avatar">
                            {user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                          </div>
                          <div className="user-details">
                            <div className="user-name">{user.name}</div>
                            <div className="user-email">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="td-role">
                        <span className={roleStyle.className}>{roleStyle.text}</span>
                      </td>
                      <td className="td-status">
                        <div className="status-indicator">
                          <span className="status-dot online"></span>
                          <span className="status-text">{user.lastActive}</span>
                        </div>
                      </td>
                      <td className="td-actions">
                        <div className="action-buttons">
                          <button onClick={() => openEditModal(user)} className="btn-icon btn-edit" title="Редактировать">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M11.5 2.5L13.5 4.5L4.5 13.5H2.5V11.5L11.5 2.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                          <button onClick={() => handleDelete(user.id)} className="btn-icon btn-delete" title="Удалить">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M2.5 4H13.5M6.5 2H9.5M6.5 6V11.5M9.5 6V11.5M12 4V12.5C12 13.1 11.6 13.5 11 13.5H5C4.4 13.5 4 13.1 4 12.5V4H12Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="empty-state">
                    Пользователи не найдены
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="admin-footer">
          <div className="footer-info">
            Показано {filteredUsers.length} из {users.length} пользователей
          </div>
          <div className="footer-hint">
            Нажмите на иконку карандаша для редактирования
          </div>
        </div>
      </div>

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">
              {editingUser ? 'Редактировать пользователя' : 'Добавить пользователя'}
            </h3>
            <form onSubmit={handleSaveUser}>
              <div className="form-group">
                <label className="form-label">Имя и Фамилия</label>
                <input 
                  type="text" 
                  className="search-input" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Иван Иванов"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Электронная почта</label>
                <input 
                  type=" and email" 
                  className="search-input" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="example@davs.ru"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Роль</label>
                <select 
                  className="search-input" 
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="Администратор">Администратор</option>
                  <option value="Редактор">Редактор</option>
                  <option value="Пользователь">Пользователь</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={closeModal}>Отмена</button>
                <button type="submit" className="btn-primary">Сохранить</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};