// src/Layout/Layout.jsx
import { Outlet, Link, useLocation } from 'react-router-dom';
import './Layout.css';

function Layout() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className="app-layout">
      {/* ЛЕВАЯ ПАНЕЛЬ (САЙДБАР) */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">🚄</div>
          <span className="logo-text">ДАВС</span>
        </div>

        <nav className="nav-menu">
          <Link to="/" className={`nav-item ${isActive('/')}`}>
            <span className="icon">🏠</span>
            <span className="label">Главная</span>
          </Link>

          <Link to="/incidentcard" className={`nav-item ${isActive('/incidentcard')}`}>
            <span className="icon">📋</span>
            <span className="label">Происшествия</span>
          </Link>

          <Link to="/create" className={`nav-item ${isActive('/create')}`}>
            <span className="icon">➕</span>
            <span className="label">Создать происшествие</span>
          </Link>

          <div className="nav-item wip">
            <span className="icon">💬</span>
            <span className="label">
              Чат штаба
              <span className="wip-badge">WIP</span>
            </span>
          </div>

          <div className="nav-item wip">
            <span className="icon">📦</span>
            <span className="label">
              Архив
              <span className="wip-badge">WIP</span>
            </span>
          </div>

          <Link to="/aichat" className={`nav-item ${isActive('/aichat')}`}>
            <span className="icon">🤖</span>
            <span className="label">Чат по регламентам ИИ</span>
          </Link>
        </nav>

        <div className="user-profile">
          <div className="avatar">НП</div>
          <div className="user-info">
            <span className="user-name">Начальник поезда</span>
            <span className="user-status">Онлайн</span>
          </div>
        </div>
      </aside>

      {/* ПРАВАЯ ЧАСТЬ (КОНТЕНТ) */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;