// src/pages/CreateIncidentPage/CreateIncidentPage.jsx
import { useState, useRef } from 'react';
import './CreateIncidentPage.css';

const INCIDENT_TYPES = [
  'Сход вагона',
  'Столкновение',
  'Посторонний предмет',
  'Повреждение инфраструктуры',
  'Задержка отправления',
  'Другое',
];

const INITIAL = {
  type: 'Сход вагона',
  location: '',
  description: '',
  photo: null,
};

export const CreateIncidentPage = () => {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const validate = () => {
    const next = {};
    if (!values.location.trim())    next.location    = 'Укажите место происшествия';
    if (!values.description.trim()) next.description = 'Добавьте краткое описание';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] ?? null;
    setValues((prev) => ({ ...prev, photo: file }));
  };

  const handleReset = () => {
    setValues(INITIAL);
    setErrors({});
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    console.log('Создаём инцидент:', values);
    setTimeout(() => {
      setLoading(false);
      // Можно добавить уведомление об успехе
    }, 800);
  };

  return (
    <div className="incident-page">
      <div className="incident-container">
        
        {/* Header */}
        <div className="page-header">
          <div className="header-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" stroke="#4A90E2" strokeWidth="2" fill="rgba(74,144,226,0.1)"/>
              <path d="M16 10V16L20 20" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="header-content">
            <h1 className="page-title">Создать происшествие</h1>
            <p className="page-subtitle">
              Первичное сообщение. Позже можно дополнить планом и материалами.
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="form-card">
          <form onSubmit={handleSubmit} noValidate>
            
            {/* Тип происшествия */}
            <div className="form-group">
              <label className="form-label" htmlFor="incident-type">
                Тип происшествия <span className="required">*</span>
              </label>
              <div className="select-wrapper">
                <select
                  id="incident-type"
                  className="form-select"
                  value={values.type}
                  onChange={handleChange('type')}
                >
                  {INCIDENT_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <svg className="select-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Место */}
            <div className="form-group">
              <label className="form-label" htmlFor="incident-location">
                Место происшествия <span className="required">*</span>
              </label>
              <input
                id="incident-location"
                className={`form-input ${errors.location ? 'input-error' : ''}`}
                type="text"
                placeholder='Например: перегон "Восточный", км 245+3'
                value={values.location}
                onChange={handleChange('location')}
              />
              {errors.location && (
                <span className="error-message">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="6" fill="#dc2626"/>
                    <path d="M7 4V8M7 10V11" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  {errors.location}
                </span>
              )}
            </div>

            {/* Описание */}
            <div className="form-group">
              <label className="form-label" htmlFor="incident-desc">
                Краткое описание <span className="required">*</span>
              </label>
              <textarea
                id="incident-desc"
                className={`form-textarea ${errors.description ? 'input-error' : ''}`}
                placeholder="Что произошло, сколько вагонов, есть ли опасные грузы, пострадавшие и т.д."
                rows={5}
                value={values.description}
                onChange={handleChange('description')}
              />
              <div className="char-counter">
                {values.description.length}/500
              </div>
              {errors.description && (
                <span className="error-message">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="6" fill="#dc2626"/>
                    <path d="M7 4V8M7 10V11" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  {errors.description}
                </span>
              )}
            </div>

            {/* Фото / схема */}
            <div className="form-group">
              <label className="form-label">Фото / схема</label>
              <div className="upload-area">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  id="incident-photo"
                  className="file-input"
                  onChange={handleFileChange}
                />
                <label htmlFor="incident-photo" className="upload-label">
                  <div className="upload-icon">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <rect x="4" y="8" width="24" height="20" rx="4" stroke="#4A90E2" strokeWidth="2"/>
                      <circle cx="12" cy="14" r="3" stroke="#4A90E2" strokeWidth="2"/>
                      <path d="M20 18L24 22L28 18" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span className="upload-text">
                    {values.photo ? (
                      <span className="file-selected">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M4 8L7 11L12 5" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        {values.photo.name}
                      </span>
                    ) : (
                      <>
                        <strong>Нажмите для загрузки</strong>
                        <br />
                        <span className="upload-hint">PNG, JPG до 10 МБ</span>
                      </>
                    )}
                  </span>
                </label>
                {values.photo && (
                  <button
                    type="button"
                    className="clear-file-btn"
                    onClick={() => {
                      setValues((prev) => ({ ...prev, photo: null }));
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    title="Удалить файл"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                )}
              </div>
              <p className="form-hint">
                После создания происшествия можно добавить дополнительные материалы и сформировать оперативный план.
              </p>
            </div>

            {/* Кнопки */}
            <div className="form-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={handleReset}
                disabled={loading}
              >
                Сбросить
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Создание...
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M9 4.5V13.5M4.5 9H13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Создать происшествие
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

        {/* Info Card */}
        <div className="info-card">
          <div className="info-header">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8" stroke="#f59e0b" strokeWidth="2"/>
              <path d="M10 6V10M10 13V14" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>Важно</span>
          </div>
          <ul className="info-list">
            <li>Все поля, отмеченные <span className="required">*</span>, обязательны для заполнения</li>
            <li>После создания инцидент получит уникальный ID для отслеживания</li>
            <li>Фотографии помогают быстрее оценить ситуацию и принять решение</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default CreateIncidentPage;