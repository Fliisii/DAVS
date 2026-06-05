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
    { id: 'm1', icon: '📝', name: 'Набросок плана "на коленке"', type: 'file' },
    { id: 'm2', icon: '📊', name: 'Диаграмма Ганта (после ликвидации)', type: 'file' },
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
function PlanTab({ initialSteps }) {
  const [steps, setSteps] = useState(initialSteps);
  const [isEditing, setIsEditing] = useState(false);
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file),
      name: file.name
    }));
    setImages(prev => [...prev, ...newImages]);
    e.target.value = null;
  };

  const removeImage = (id) => {
    setImages(prev => {
      const imgToRemove = prev.find(img => img.id === id);
      if (imgToRemove) URL.revokeObjectURL(imgToRemove.url);
      return prev.filter(img => img.id !== id);
    });
  };

  const updateStep = (index, value) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const addStep = () => setSteps([...steps, 'Новый шаг']);
  
  const removeStep = (index) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  return (
    <div className="content-grid">
      <div className="card card-large">
        <div className="card-header">
          <h4 className="card-title">📋 Оперативный план</h4>
          <button 
            className={`btn-sm ${isEditing ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? '💾 Сохранить' : '✏️ Редактировать'}
          </button>
        </div>
        <div className="card-body">
          <p className="hint-text">
            Здесь дежурный фиксирует, что и где делаем. {isEditing ? 'Вы можете изменять, добавлять или удалять шаги.' : 'Редактировать могут только ответственные лица.'}
          </p>
          <ol className="plan-steps">
            {steps.map((step, i) => (
              <li key={i} className="plan-step">
                <span className="step-number">{i + 1}</span>
                {isEditing ? (
                  <div className="step-edit-row">
                    <input
                      type="text"
                      className="step-input"
                      value={step}
                      onChange={(e) => updateStep(i, e.target.value)}
                    />
                    <button className="btn-icon btn-danger" onClick={() => removeStep(i)} title="Удалить шаг">🗑️</button>
                  </div>
                ) : (
                  <span className="step-text">{step}</span>
                )}
              </li>
            ))}
          </ol>
          {isEditing && (
            <button className="btn-secondary" onClick={addStep} style={{ marginTop: 8 }}>
              ➕ Добавить шаг
            </button>
          )}
        </div>
      </div>

      <div className="card card-large">
        <div className="card-header">
          <h4 className="card-title">🗺️ Схема места</h4>
        </div>
        <div className="card-body">
          <p className="hint-text">
            Загрузите фото / скан бумажного плана. Можно добавить несколько изображений.
          </p>
          {images.length === 0 ? (
            <div className="scheme-placeholder">
              <span className="scheme-icon">🗺️</span>
              <span>Схема не загружена</span>
            </div>
          ) : (
            <div className="image-gallery">
              {images.map(img => (
                <div key={img.id} className="image-item">
                  <img src={img.url} alt={img.name} className="image-preview" />
                  <button className="remove-image-btn" onClick={() => removeImage(img.id)} title="Удалить">✕</button>
                  <span className="image-name" title={img.name}>{img.name}</span>
                </div>
              ))}
            </div>
          )}
          <input type="file" accept="image/*" multiple ref={fileInputRef} onChange={handleImageUpload} style={{ display: 'none' }} />
          <button className="btn-secondary" type="button" onClick={() => fileInputRef.current?.click()}>
            ⬆️ {images.length > 0 ? 'Добавить ещё' : 'Загрузить схему'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Вкладка: Материалы ───────────────────────────────────────────────────────
function MaterialsTab({ initialMaterials }) {
  const [materials, setMaterials] = useState(initialMaterials);
  const fileInputRef = useRef(null);

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const newMaterials = files.map(file => ({
      id: 'm' + Date.now() + Math.random(),
      icon: '🖼️',
      name: file.name,
      type: 'image',
      url: URL.createObjectURL(file)
    }));
    setMaterials(prev => [...prev, ...newMaterials]);
    e.target.value = null;
  };

  const removeMaterial = (id) => {
    setMaterials(prev => {
      const item = prev.find(m => m.id === id);
      if (item?.url) URL.revokeObjectURL(item.url);
      return prev.filter(m => m.id !== id);
    });
  };

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
              <span className="material-name" title={m.name}>{m.name}</span>
              <div className="material-actions">
                <button className="btn-icon btn-view" type="button" title="Открыть">👁️</button>
                <button className="btn-icon btn-danger" type="button" title="Удалить" onClick={() => removeMaterial(m.id)}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
        <input type="file" accept="image/*,.pdf,.doc,.docx" multiple ref={fileInputRef} onChange={handleUpload} style={{ display: 'none' }} />
        <button className="btn-secondary" style={{ marginTop: 16 }} onClick={() => fileInputRef.current?.click()}>
          ⬆️ Загрузить материал
        </button>
      </div>
    </div>
  );
}

// ─── Вкладка: Хронометраж ─────────────────────────────────────────────────────
function TimelineTab({ initialEntries }) {
  const [entries, setEntries] = useState(initialEntries);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ action: '', start: '', end: '', responsible: '' });

  const startEdit = (entry) => {
    setEditingId(entry.id);
    setEditForm({ ...entry });
  };

  const saveEdit = () => {
    setEntries(entries.map(e => e.id === editingId ? { ...e, ...editForm } : e));
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const deleteEntry = (id) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  const moveEntry = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= entries.length) return;
    const newEntries = [...entries];
    [newEntries[index], newEntries[newIndex]] = [newEntries[newIndex], newEntries[index]];
    setEntries(newEntries);
  };

  const addNewEntry = () => {
    const newId = 't' + Date.now();
    const newEntry = { id: newId, action: 'Новое действие', start: '—', end: '—', responsible: '—' };
    setEntries([...entries, newEntry]);
    startEdit(newEntry);
  };

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
                <th style={{ width: '40%' }}>Действие</th>
                <th>Начало</th>
                <th>Конец</th>
                <th className="hide-mobile">Ответственный</th>
                <th style={{ width: '120px' }}>Действия</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e, index) => (
                <tr key={e.id}>
                  {editingId === e.id ? (
                    <>
                      <td><input className="table-input" value={editForm.action} onChange={ev => setEditForm({...editForm, action: ev.target.value})} /></td>
                      <td><input className="table-input" value={editForm.start} onChange={ev => setEditForm({...editForm, start: ev.target.value})} /></td>
                      <td><input className="table-input" value={editForm.end} onChange={ev => setEditForm({...editForm, end: ev.target.value})} /></td>
                      <td className="hide-mobile"><input className="table-input" value={editForm.responsible} onChange={ev => setEditForm({...editForm, responsible: ev.target.value})} /></td>
                      <td>
                        <button className="btn-icon btn-success" onClick={saveEdit} title="Сохранить">💾</button>
                        <button className="btn-icon btn-secondary" onClick={cancelEdit} title="Отмена">✕</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="td-action">{e.action}</td>
                      <td className="td-time">{e.start}</td>
                      <td className="td-time">{e.end}</td>
                      <td className="td-responsible hide-mobile">{e.responsible}</td>
                      <td>
                        <div className="timeline-actions">
                          <button className="btn-icon btn-sm" onClick={() => moveEntry(index, -1)} disabled={index === 0} title="Вверх">⬆️</button>
                          <button className="btn-icon btn-sm" onClick={() => moveEntry(index, 1)} disabled={index === entries.length - 1} title="Вниз">⬇️</button>
                          <button className="btn-icon btn-sm" onClick={() => startEdit(e)} title="Редактировать">✏️</button>
                          <button className="btn-icon btn-sm btn-danger" onClick={() => deleteEntry(e.id)} title="Удалить">🗑️</button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="btn-secondary" style={{ marginTop: 16 }} onClick={addNewEntry}>
          ➕ Добавить запись
        </button>
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
  const [imageAttachment, setImageAttachment] = useState(null);
  const bottomRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageAttachment({ url: URL.createObjectURL(file), name: file.name });
    }
    e.target.value = null;
  };

  const send = () => {
    if (!input.trim() && !imageAttachment) return;
    const now = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { 
      id: Date.now().toString(), 
      sender: 'user', 
      text: input, 
      time: now,
      imageUrl: imageAttachment?.url,
      imageName: imageAttachment?.name
    }]);
    setInput('');
    setImageAttachment(null);
  };

  return (
    <div className="card card-large chat-card">
      <div className="card-header">
        <h4 className="card-title">💬 Чат штаба</h4>
        <span className="chat-status">🟢 Онлайн</span>
      </div>
      <div className="chat-messages">
        {messages.map((m) => (
          <div key={m.id} className={`chat-message ${m.sender === 'user' ? 'message-user' : 'message-staff'}`}>
            <div className="message-bubble">
              {m.imageUrl && (
                <div className="chat-image-wrapper">
                  <img src={m.imageUrl} alt={m.imageName} className="chat-bubble-image" />
                </div>
              )}
              {m.text && <p className="message-text">{m.text}</p>}
              <span className="message-time">{m.time}</span>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="chat-input-area">
        {imageAttachment && (
          <div className="chat-attachment-preview">
            <img src={imageAttachment.url} alt="preview" />
            <button className="remove-attachment-btn" onClick={() => { setImageAttachment(null); if(fileInputRef.current) fileInputRef.current.value = ''; }}>✕</button>
          </div>
        )}
        <div className="chat-input-row">
          <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageSelect} style={{ display: 'none' }} />
          <button className="btn-icon btn-attach" onClick={() => fileInputRef.current?.click()} title="Прикрепить фото">📎</button>
          <input
            type="text"
            placeholder="Сообщение в штаб..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            className="chat-input"
          />
          <button className="btn-send" onClick={send} type="button" title="Отправить">➤</button>
        </div>
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

      <div className="tab-content">
        {activeTab === 'plan' && <PlanTab initialSteps={incident.plan} />}
        {activeTab === 'materials' && <MaterialsTab initialMaterials={incident.materials} />}
        {activeTab === 'timeline' && <TimelineTab initialEntries={incident.timeline} />}
        {activeTab === 'chat' && <ChatTab />}
      </div>
    </div>
  );
};

export default IncidentCard;