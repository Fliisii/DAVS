import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const menuItems = [
    { path: '/incidentcard', label: 'Карта инцидента' },
    { path: '/create', label: 'Создать инцидент' },
    { path: '/admin', label: 'Админ-панель' },
    { path: '/aichat', label: 'Чат с регламентами' },
    { path: '/analytics', label: 'Аналитика ликвидации' },
  ];

  return (
    <div className="home-container">
      <h1>Главная страница</h1>
      <p>Выберите раздел для перехода:</p>
      
      <nav className="home-nav">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path} className="nav-link">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default HomePage;