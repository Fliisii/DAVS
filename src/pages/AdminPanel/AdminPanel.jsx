// src/pages/AdminPanel/AdminPanel.jsx
import React from 'react';
import './AdminPanel.css';

export const AdminPanel = () => {
  const users = [
    { id: 1, name: 'Иван Петров', role: 'Администратор', email: 'ivan.petrov@davs.ru', lastActive: 'Сегодня, 14:32' },
    { id: 2, name: 'Мария Сидорова', role: 'Редактор', email: 'maria.sidorova@davs.ru', lastActive: 'Сегодня, 13:15' },
    { id: 3, name: 'Алексей Смирнов', role: 'Пользователь', email: 'alexey.smirnov@davs.ru', lastActive: 'Вчера, 18:45' },
  ];

  const handleAddUser = () => {
    console.log('Добавить пользователя');
  };

  const handleEdit = (userId) => {
    console.log('Редактировать пользователя:', userId);
  };

  const handleDelete = (userId) => {
    console.log('Удалить пользователя:', userId);
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
              <div className="stat-value">3</div>
              <div className="stat-label">Онлайн</div>
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
              placeholder="Поиск пользователей..."
              className="search-input"
            />
          </div>
          <button 
            onClick={handleAddUser}
            className="btn-primary btn-add"
          >
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
              {users.map((user) => {
                const roleStyle = getRoleStyle(user.role);
                return (
                  <tr key={user.id} className="table-row">
                    <td className="td-user">
                      <div className="user-info">
                        <div className="user-avatar">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="user-details">
                          <div className="user-name">{user.name}</div>
                          <div className="user-email">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="td-role">
                      <span className={roleStyle.className}>
                        {roleStyle.text}
                      </span>
                    </td>
                    <td className="td-status">
                      <div className="status-indicator">
                        <span className="status-dot online"></span>
                        <span className="status-text">{user.lastActive}</span>
                      </div>
                    </td>
                    <td className="td-actions">
                      <div className="action-buttons">
                        <button 
                          onClick={() => handleEdit(user.id)}
                          className="btn-icon btn-edit"
                          title="Редактировать"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M11.5 2.5L13.5 4.5L4.5 13.5H2.5V11.5L11.5 2.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        <button 
                          onClick={() => handleDelete(user.id)}
                          className="btn-icon btn-delete"
                          title="Удалить"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M2.5 4H13.5M6.5 2H9.5M6.5 6V11.5M9.5 6V11.5M12 4V12.5C12 13.1 11.6 13.5 11 13.5H5C4.4 13.5 4 13.1 4 12.5V4H12Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="admin-footer">
          <div className="footer-info">
            Показано {users.length} из {users.length} пользователей
          </div>
          <div className="footer-hint">
            Нажмите на строку для подробной информации
          </div>
        </div>
      </div>
    </div>
  );
};