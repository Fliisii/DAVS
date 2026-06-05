import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Layout.css';

function Layout() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const isActive = (path) => location.pathname === path ? 'active' : '';

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile && isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile, isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = () => {
    if (isMobile) {
      closeMobileMenu();
    }
  };

  return (
    <div className="app-layout">
      {/* Кнопка бургер-меню (только для мобильных) */}
      <button 
        className="menu-toggle" 
        onClick={toggleMobileMenu}
        aria-label="Меню"
      >
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>
      
      {/* Оверлей для закрытия меню при клике вне его */}
      <div 
        className={`mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={closeMobileMenu}
      />
      
      {/* ЛЕВАЯ ПАНЕЛЬ (САЙДБАР) */}
      <aside className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="logo">
          <div className="logo-icon">🚄</div>
          <span className="logo-text">ДАВС</span>
        </div>

        <nav className="nav-menu">
          <Link 
            to="/" 
            className={`nav-item ${isActive('/')}`}
            onClick={handleNavClick}
          >
            <span className="icon">🏠</span>
            <span className="label">Главная</span>
          </Link>

          <Link 
            to="/incidentcard" 
            className={`nav-item ${isActive('/incidentcard')}`}
            onClick={handleNavClick}
          >
            <span className="icon">📋</span>
            <span className="label">Происшествия</span>
          </Link>

          <Link 
            to="/create" 
            className={`nav-item ${isActive('/create')}`}
            onClick={handleNavClick}
          >
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

          <Link 
            to="/aichat" 
            className={`nav-item ${isActive('/aichat')}`}
            onClick={handleNavClick}
          >
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