// src/pages/IncidentCard/IncidentCard.jsx
import { useState, useRef, useEffect } from 'react';
import './IncidentCard.css';

// ─── Mock данные ──────────────────────────────────────────────────────────────

const MOCK_INCIDENT = {
  id: 'inc-12345',
  title: 'Сход вагона №12345',
  location: 'Перегон "Восточный"',
  date: '2023-10-28',
  type: 'Авария на ЖД',
  status: 'active',
  role: 'Начальник восстановительного поезда',
  plan: [
    'Ограждение места работ и проверка безопасности.',
    'Размещение кранов и бульдозеров по схеме.',
    'Подъём вагона №12345 гидравлическим оборудованием.',
    'Уборка тележки и подготовка пути к восстановлению движения.',
  ],
  materials: [
    { id: 'm1', icon: '🖼️', name: 'Фото места происшествия (общий план)' },
    { id: 'm2', icon: '📝', name: 'Набросок плана "на коленке"' },
    { id: 'm3', icon: '📊', name: 'Диаграмма Ганта (после ликвидации)' },
  ],
  timeline: [
    { id: 't1', action: 'Получен приказ на выезд', start: '19:05', end: '—', responsible: 'Начальник поезда' },
    { id: 't2', action: 'Прибытие на место', start: '19:40', end: '—', responsible: 'Начальник поезда' },
    { id: 't3', action: 'Уборка тележки', start: '19:50', end: '20:15', responsible: 'Бригада №2' },
  ],
};

const STATUS_MAP = {
  active:    { label: 'В работе',  className: 'status-active' },
  completed: { label: 'Завершено', className: 'status-completed' },
  archive:   { label: 'Архив',     className: 'status-archive' },
};

const TABS = [
  { id: 'plan', label: 'План', icon: '📋' },
  { id: 'materials', label: 'Материалы', icon: '📁' },
  { id: 'timeline', label: 'Хронометраж', icon: '⏱️' },
  { id: 'chat', label: 'Чат штаба', icon: '💬' },
];

// ─── Вкладка: План ────────────────────────────────────────────────────────────

function PlanTab({ steps }) {
  return (
    <div className="content-grid">
      <div className="card card-large">
        <div className="card-header">
          <h4 className="card-title">📋 Оперативный план</h4>
        </div>
        <div className="card-body">
          <p className="hint-text">
            Здесь дежурный фиксирует, что и где делаем: вагоны, техника,
            подъезды, оборудование. Редактировать могут только ответственные лица.
          </p>
          <ol className="plan-steps">
            {steps.map((step, i) => (
              <li key={i} className="plan-step">
                <span className="step-number">{i + 1}</span>
                <span className="step-text">{step}</span>
              </li>
            ))}
          </ol>
          <button className="btn-primary" style={{ marginTop: 16 }} type="button">
            ✏️ Редактировать план
          </button>
        </div>
      </div>

      <div className="card card-large">
        <div className="card-header">
          <h4 className="card-title">🗺️ Схема места</h4>
        </div>
        <div className="card-body">
          <p className="hint-text">
            Загрузите фото / скан бумажного плана или отрисуйте схему в приложении.
          </p>
          <div className="scheme-placeholder">
            <span className="scheme-icon">🗺️</span>
            <span>Схема не загружена</span>
          </div>
          <button className="btn-secondary" type="button">
            ⬆️ Загрузить схему
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Вкладка: Материалы ───────────────────────────────────────────────────────

function MaterialsTab({ materials }) {
  return (
    <div className="card card-large">
      <div className="card-header">
        <h4 className="card-title">📁 Материалы по инциденту</h4>
      </div>
      <div className="card-body">
        <p className="hint-text">
          Архив: сообщения, шаблоны, фото, диаграмма Ганта после завершения работ.
        </p>
        <div className="materials-list">
          {materials.map((m) => (
            <div key={m.id} className="material-item">
              <div className="material-icon">{m.icon}</div>
              <span className="material-name">{m.name}</span>
              <button className="btn-icon btn-view" type="button" title="Открыть">
                👁️
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Вкладка: Хронометраж ─────────────────────────────────────────────────────

function TimelineTab({ entries }) {
  return (
    <div className="card card-large">
      <div className="card-header">
        <h4 className="card-title">⏱️ Хронометраж работ</h4>
        <div className="offline-badge">
          <span className="offline-icon">📱</span>
          Работает офлайн
        </div>
      </div>
      <div className="card-body">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Действие</th>
                <th>Начало</th>
                <th>Конец</th>
                <th className="hide-mobile">Ответственный</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => (
                <tr key={e.id}>
                  <td className="td-action">{e.action}</td>
                  <td className="td-time">{e.start}</td>
                  <td className="td-time">{e.end}</td>
                  <td className="td-responsible hide-mobile">{e.responsible}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="btn-secondary" style={{ marginTop: 16 }} type="button">
          ➕ Добавить запись
        </button>
        <p className="hint-text" style={{ marginTop: 12 }}>
          В будущем: быстрый ввод типовых действий с автоподстановкой времени.
        </p>
      </div>
    </div>
  );
}

// ─── Вкладка: Чат штаба ───────────────────────────────────────────────────────

function ChatTab() {
  const [messages, setMessages] = useState([
    { id: '0', sender: 'staff', text: 'Канал связи штаба для этого происшествия. Здесь фиксируются решения и важные сообщения.', time: '19:00' },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const now = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [...prev, { id: Date.now().toString(), sender: 'user', text, time: now }]);
    setInput('');
  };

  return (
    <div className="card card-large chat-card">
      <div className="card-header">
        <h4 className="card-title">💬 Чат штаба</h4>
        <span className="chat-status">🟢 Онлайн</span>
      </div>
      <div className="chat-messages">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`chat-message ${m.sender === 'user' ? 'message-user' : 'message-staff'}`}
          >
            <div className="message-bubble">
              <p className="message-text">{m.text}</p>
              <span className="message-time">{m.time}</span>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Сообщение в штаб..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          className="chat-input"
        />
        <button className="btn-send" onClick={send} type="button" title="Отправить">
          ➤
        </button>
      </div>
    </div>
  );
}

// ─── Главная страница ─────────────────────────────────────────────────────────

export const IncidentCard = ({ incident = MOCK_INCIDENT }) => {
  const [activeTab, setActiveTab] = useState('plan');
  const statusConfig = STATUS_MAP[incident.status] ?? STATUS_MAP.active;

  return (
    <div className="incident-page">
      {/* Шапка инцидента */}
      <div className="incident-header">
        <div className="incident-main">
          <div className="incident-title-row">
            <h1 className="incident-title">{incident.title}</h1>
            <span className={`status-badge ${statusConfig.className}`}>
              {statusConfig.label}
            </span>
          </div>
          <div className="incident-meta">
            <span className="meta-item">📍 {incident.location}</span>
            <span className="meta-item">📅 {incident.date}</span>
            <span className="meta-item">🏷️ {incident.type}</span>
          </div>
        </div>
        <div className="incident-role">
          <span className="role-label">Ваша роль:</span>
          <span className="role-value">{incident.role}</span>
        </div>
      </div>

      {/* Табы навигации */}
      <div className="tabs-wrapper">
        <div className="tabs-scroll">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`tab-btn ${activeTab === t.id ? 'tab-active' : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              <span className="tab-icon">{t.icon}</span>
              <span className="tab-label">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Контент вкладок */}
      <div className="tab-content">
        {activeTab === 'plan' && <PlanTab steps={incident.plan} />}
        {activeTab === 'materials' && <MaterialsTab materials={incident.materials} />}
        {activeTab === 'timeline' && <TimelineTab entries={incident.timeline} />}
        {activeTab === 'chat' && <ChatTab />}
      </div>
    </div>
  );
};

export default IncidentCard;