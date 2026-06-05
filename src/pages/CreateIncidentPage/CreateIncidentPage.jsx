// src/pages/CreateIncidentPage/CreateIncidentPage.jsx
import { useState, useRef, useEffect } from 'react';
import './CreateIncidentPage.css';

const INCIDENT_TYPES = [
  'Сход вагона',
  'Столкновение',
  'Посторонний предмет',
  'Повреждение инфраструктуры',
  'Задержка отправления',
  'Другое',
];

const INITIAL_STATE = {
  type: 'Сход вагона',
  location: '',
  description: '',
};

export const CreateIncidentPage = () => {
  const [values, setValues] = useState(INITIAL_STATE);
  const [photos, setPhotos] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Очистка URL-адресов при размонтировании для предотвращения утечек памяти
  useEffect(() => {
    return () => {
      photos.forEach((photo) => URL.revokeObjectURL(photo.preview));
    };
  }, [photos]);

  const validate = () => {
    const nextErrors = {};
    if (!values.location.trim()) nextErrors.location = 'Укажите место происшествия';
    if (!values.description.trim()) nextErrors.description = 'Добавьте краткое описание';
    
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    const newPhotos = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9), // Уникальный ID для ключа React
    }));
    
    setPhotos((prev) => [...prev, ...newPhotos]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemovePhoto = (id) => {
    setPhotos((prev) => {
      const photoToRemove = prev.find((p) => p.id === id);
      if (photoToRemove) {
        URL.revokeObjectURL(photoToRemove.preview);
      }
      return prev.filter((p) => p.id !== id);
    });
  };

  const handleReset = () => {
    photos.forEach((photo) => URL.revokeObjectURL(photo.preview));
    setValues(INITIAL_STATE);
    setPhotos([]);
    setErrors({});
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    
    // Имитация отправки данных
    setTimeout(() => {
      console.log('Отправка инцидента:', {
        ...values,
        photoCount: photos.length,
      });
      setLoading(false);
      // Здесь можно добавить редирект или toast-уведомление об успехе
    }, 1000);
  };

  return (
    <div className="incident-page">
      <div className="incident-container">
        
        {/* Header */}
        <header className="page-header">
          <div className="header-icon-wrapper">
            <svg className="header-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <div className="header-content">
            <h1 className="page-title">Регистрация происшествия</h1>
            <p className="page-subtitle">
              Заполните первичные данные. Детали и дополнительные материалы можно будет добавить позже.
            </p>
          </div>
        </header>

        {/* Form Card */}
        <div className="form-card">
          <form onSubmit={handleSubmit} noValidate>
            
            <div className="form-grid">
              {/* Тип происшествия */}
              <div className="form-group">
                <label className="form-label" htmlFor="incident-type">
                  Тип происшествия <span className="required" aria-label="обязательное поле">*</span>
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
                  <svg className="select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>

              {/* Место */}
              <div className="form-group">
                <label className="form-label" htmlFor="incident-location">
                  Место происшествия <span className="required" aria-label="обязательное поле">*</span>
                </label>
                <input
                  id="incident-location"
                  className={`form-input ${errors.location ? 'input-error' : ''}`}
                  type="text"
                  placeholder="Например: перегон «Восточный», км 245+3"
                  value={values.location}
                  onChange={handleChange('location')}
                  aria-invalid={!!errors.location}
                  aria-describedby={errors.location ? "location-error" : undefined}
                />
                {errors.location && (
                  <span id="location-error" className="error-message">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    {errors.location}
                  </span>
                )}
              </div>
            </div>

            {/* Описание */}
            <div className="form-group">
              <label className="form-label" htmlFor="incident-desc">
                Краткое описание <span className="required" aria-label="обязательное поле">*</span>
              </label>
              <textarea
                id="incident-desc"
                className={`form-textarea ${errors.description ? 'input-error' : ''}`}
                placeholder="Опишите ситуацию: количество вагонов, наличие опасных грузов, пострадавших и т.д."
                rows={5}
                maxLength={500}
                value={values.description}
                onChange={handleChange('description')}
                aria-invalid={!!errors.description}
                aria-describedby={errors.description ? "desc-error" : "desc-counter"}
              />
              <div className="input-footer">
                <span id="desc-counter" className="char-counter">
                  {values.description.length}/500
                </span>
                {errors.description && (
                  <span id="desc-error" className="error-message">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    {errors.description}
                  </span>
                )}
              </div>
            </div>

            {/* Фото / схема */}
            <div className="form-group">
              <label className="form-label">Фотографии и схемы</label>
              <div className="upload-zone">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  id="incident-photo"
                  className="file-input"
                  multiple
                  onChange={handleFileChange}
                />
                <label htmlFor="incident-photo" className="upload-trigger">
                  <div className="upload-icon-wrapper">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                  </div>
                  <div className="upload-text">
                    <span className="upload-main-text">Перетащите файлы сюда или <span className="upload-link">выберите на компьютере</span></span>
                    <span className="upload-hint">PNG, JPG до 10 МБ (можно выбрать несколько)</span>
                  </div>
                </label>
              </div>

              {/* Сетка предпросмотра */}
              {photos.length > 0 && (
                <div className="preview-grid">
                  {photos.map((photo) => (
                    <div key={photo.id} className="preview-card">
                      <img 
                        src={photo.preview} 
                        alt="Предпросмотр" 
                        className="preview-image" 
                      />
                      <button
                        type="button"
                        className="preview-remove-btn"
                        onClick={() => handleRemovePhoto(photo.id)}
                        title="Удалить файл"
                        aria-label="Удалить файл"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                      <div className="preview-info">
                        <span className="preview-filename" title={photo.file.name}>
                          {photo.file.name}
                        </span>
                        <span className="preview-size">
                          {(photo.file.size / 1024 / 1024).toFixed(2)} МБ
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Кнопки действий */}
            <div className="form-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleReset}
                disabled={loading}
              >
                Очистить форму
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Обработка...
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Зарегистрировать происшествие
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateIncidentPage;