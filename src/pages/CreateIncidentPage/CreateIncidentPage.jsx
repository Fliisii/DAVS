import { useState, useRef } from 'react';
import styles from './CreateIncidentPage.module.css';

const INCIDENT_TYPES = [
  'Сход вагона',
  'Столкновение',
  'Посторонний предмет',
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
    // TODO: сюда потом воткнёшь запрос к бэку
    console.log('Создаём инцидент:', values);
    setTimeout(() => setLoading(false), 800);
  };

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.pageHeader}>
        <div className={styles.titleBlock}>
          <h1>Создать происшествие</h1>
          <span className={styles.subtitle}>
            Первичное сообщение, позже можно будет дополнить планом и материалами.
          </span>
        </div>
      </header>

      <main className={styles.pageContent}>
        <form className={styles.formCard} onSubmit={handleSubmit} noValidate>
          <h3 className={styles.formTitle}>
            <i className="fas fa-plus-circle" />
            Первичное сообщение о происшествии
          </h3>

          {/* Тип происшествия */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="incident-type">
              Тип происшествия
            </label>
            <div className={styles.selectWrapper}>
              <select
                id="incident-type"
                className={styles.select}
                value={values.type}
                onChange={handleChange('type')}
              >
                {INCIDENT_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <i className={`fas fa-chevron-down ${styles.selectArrow}`} />
            </div>
          </div>

          {/* Место */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="incident-location">
              Место
            </label>
            <input
              id="incident-location"
              className={`${styles.input} ${errors.location ? styles.inputError : ''}`}
              type="text"
              placeholder='Например, перегон "Восточный"'
              value={values.location}
              onChange={handleChange('location')}
            />
            {errors.location && (
              <span className={styles.errorText}>
                <i className="fas fa-exclamation-circle" /> {errors.location}
              </span>
            )}
          </div>

          {/* Описание */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="incident-desc">
              Краткое описание
            </label>
            <textarea
              id="incident-desc"
              className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
              placeholder="Что произошло, сколько вагонов, опасные грузы и т.д."
              value={values.description}
              onChange={handleChange('description')}
            />
            {errors.description && (
              <span className={styles.errorText}>
                <i className="fas fa-exclamation-circle" /> {errors.description}
              </span>
            )}
          </div>

          {/* Фото / схема */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Фото / схема</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              id="incident-photo"
              className={styles.fileInput}
              onChange={handleFileChange}
            />
            <label htmlFor="incident-photo" className={styles.uploadBtn}>
              <i className="fas fa-camera" />
              {values.photo ? values.photo.name : 'Загрузить фото'}
            </label>
            {values.photo && (
              <button
                type="button"
                className={styles.clearFileBtn}
                onClick={() => {
                  setValues((prev) => ({ ...prev, photo: null }));
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
              >
                <i className="fas fa-times" />
              </button>
            )}
            <p className={styles.hint}>
              После создания происшествия можно будет добавить материалы и сформировать оперативный план.
            </p>
          </div>

          {/* Кнопки */}
          <div className={styles.actions}>
            <button
              type="submit"
              className={styles.primaryBtn}
              disabled={loading}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin" />
                  Создание...
                </>
              ) : (
                <>
                  <i className="fas fa-plus" />
                  Создать происшествие
                </>
              )}
            </button>
            <button
              type="button"
              className={styles.secondaryBtn}
              onClick={handleReset}
              disabled={loading}
            >
              Сбросить
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateIncidentPage;