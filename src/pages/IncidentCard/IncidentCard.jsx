import { useState, useRef, useEffect } from 'react';
import styles from './IncidentCard.module.css';

// ─── Mock данные (потом заменишь на props / API) ──────────────────────────────

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
    { id: 'm1', icon: 'far fa-image',    name: 'Фото места происшествия (общий план)' },
    { id: 'm2', icon: 'far fa-file-alt', name: 'Набросок плана "на коленке"' },
    { id: 'm3', icon: 'far fa-chart-bar',name: 'Диаграмма Ганта (после ликвидации)' },
  ],
  timeline: [
    { id: 't1', action: 'Получен приказ на выезд', start: '19:05', end: '—',   responsible: 'Начальник поезда' },
    { id: 't2', action: 'Прибытие на место',       start: '19:40', end: '—',   responsible: 'Начальник поезда' },
    { id: 't3', action: 'Уборка тележки',          start: '19:50', end: '20:15', responsible: 'Бригада №2' },
  ],
};

const STATUS_MAP = {
  active:    { label: 'В работе',  color: 'orange'  },
  completed: { label: 'Завершено', color: '#6b7280' },
  archive:   { label: 'Архив',     color: '#9ca3af' },
};

const TABS = [
  { id: 'plan',      label: 'План'        },
  { id: 'materials', label: 'Материалы'   },
  { id: 'timeline',  label: 'Хронометраж' },
  { id: 'chat',      label: 'Чат штаба'   },
];

// ─── Вкладка: План ────────────────────────────────────────────────────────────

function PlanTab({ steps }) {
  return (
    <div className={styles.planGrid}>
      <div className={styles.planBlock}>
        <h4>Оперативный план</h4>
        <p className={styles.hint}>
          Здесь дежурный фиксирует, что и где делаем: вагоны, техника,
          подъезды, оборудование. Редактировать могут только ответственные лица.
        </p>
        <ol className={styles.planSteps}>
          {steps.map((step, i) => <li key={i}>{step}</li>)}
        </ol>
        <button className={styles.primaryBtn} style={{ marginTop: 12 }} type="button">
          Редактировать план
        </button>
      </div>

      <div className={styles.planBlock}>
        <h4>Схема</h4>
        <p className={styles.hint}>
          Загрузите фото / скан бумажного плана или отрисуйте схему в приложении.
        </p>
        <button className={styles.smallBtn} type="button">
          <i className="fas fa-upload" /> Загрузить схему
        </button>
      </div>
    </div>
  );
}

// ─── Вкладка: Материалы ───────────────────────────────────────────────────────

function MaterialsTab({ materials }) {
  return (
    <div className={styles.planBlock}>
      <h4>Материалы по инциденту</h4>
      <p className={styles.hint}>
        Архив: сообщения, шаблоны, фото, диаграмма Ганта после завершения работ.
      </p>
      <div className={styles.materialsList}>
        {materials.map((m) => (
          <div key={m.id} className={styles.materialItem}>
            <span><i className={m.icon} /> {m.name}</span>
            <button className={styles.smallBtn} type="button">
              <i className="fas fa-eye" /> Открыть
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Вкладка: Хронометраж ─────────────────────────────────────────────────────

function TimelineTab({ entries }) {
  return (
    <div className={styles.planBlock}>
      <div className={styles.timelineHeader}>
        <h4>Хронометраж работ</h4>
        <div className={styles.offlineHint}>
          <i className="fas fa-mobile-alt" />
          Работает офлайн — данные отправятся при появлении связи.
        </div>
      </div>
      <table className={styles.timelineTable}>
        <thead>
          <tr>
            <th>Действие</th>
            <th>Начало</th>
            <th>Конец</th>
            <th className={styles.hideOnMobile}>Ответственный</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => (
            <tr key={e.id}>
              <td>{e.action}</td>
              <td>{e.start}</td>
              <td>{e.end}</td>
              <td className={styles.hideOnMobile}>{e.responsible}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className={styles.smallBtn} style={{ marginTop: 10 }} type="button">
        <i className="fas fa-plus" /> Добавить запись
      </button>
      <p className={styles.hint} style={{ marginTop: 8 }}>
        В будущем: быстрый ввод типовых действий с автоподстановкой времени.
      </p>
    </div>
  );
}

// ─── Вкладка: Чат штаба ───────────────────────────────────────────────────────

function ChatTab() {
  const [messages, setMessages] = useState([
    { id: '0', sender: 'staff', text: 'Канал связи штаба для этого происшествия. Здесь фиксируются решения и важные сообщения.' },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { id: Date.now().toString(), sender: 'user', text }]);
    setInput('');
  };

  return (
    <div className={styles.planBlock}>
      <h4>Чат штаба по инциденту</h4>
      <div className={styles.staffChat}>
        <div className={styles.chatMessages}>
          {messages.map((m) => (
            <div
              key={m.id}
              className={`${styles.message} ${m.sender === 'user' ? styles.messageUser : styles.messageStaff}`}
            >
              {m.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div className={styles.chatInputArea}>
          <input
            type="text"
            placeholder="Сообщение в штаб..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
          />
          <button className={styles.sendBtn} onClick={send} type="button">
            <i className="fas fa-paper-plane" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Главная страница ─────────────────────────────────────────────────────────

export const IncidentCard = ({ incident = MOCK_INCIDENT }) => {
  const [activeTab, setActiveTab] = useState('plan');
  const { label: statusLabel, color: statusColor } = STATUS_MAP[incident.status] ?? STATUS_MAP.active;

  return (
    <div className={styles.incidentLayout}>

      {/* Шапка */}
      <div className={styles.incidentTop}>
        <div className={styles.incidentInfo}>
          <div className={styles.incidentTitle}>{incident.title}</div>
          <div className={styles.incidentMeta}>
            <span className={styles.badge}>{incident.location}</span>
            <span>{incident.date}</span>
            <span>Тип: {incident.type}</span>
          </div>
        </div>

        <div className={styles.sideMeta}>
          <div><strong>Роль:</strong> {incident.role}</div>
          <div>
            <strong>Статус:</strong>{' '}
            <span style={{ color: statusColor }}>{statusLabel}</span>
          </div>
        </div>
      </div>

      {/* Табы */}
      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`${styles.tab} ${activeTab === t.id ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Контент */}
      <div className={styles.tabContent}>
        {activeTab === 'plan'      && <PlanTab steps={incident.plan} />}
        {activeTab === 'materials' && <MaterialsTab materials={incident.materials} />}
        {activeTab === 'timeline'  && <TimelineTab entries={incident.timeline} />}
        {activeTab === 'chat'      && <ChatTab />}
      </div>

    </div>
  );
};

export default IncidentCard;