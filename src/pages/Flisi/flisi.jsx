import React, { useState } from 'react';
import './Flisi.css';

export const Flisi = () => {
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [delayReason, setDelayReason] = useState('');
  const [showGantt, setShowGantt] = useState(false); // ← новое состояние

  const [processes, setProcesses] = useState([
    { id: 1, name: 'Оценка обстановки', start: '', end: '', description: '' },
    { id: 2, name: 'Ограждение места работ', start: '', end: '', description: '' },
    { id: 3, name: 'Подготовка техники', start: '', end: '', description: '' },
    { id: 4, name: 'Подъем вагона', start: '', end: '', description: '' },
    { id: 5, name: 'Уборка тележки', start: '', end: '', description: '' },
    { id: 6, name: 'Восстановление пути', start: '', end: '', description: '' },
  ]);

  const handleProcessChange = (id, field, value) => {
    setProcesses(processes.map(process =>
      process.id === id ? { ...process, [field]: value } : process
    ));
    // Сбрасываем диаграмму при изменении данных, чтобы пользователь пересчитал
    if (showGantt) setShowGantt(false);
  };

  const handleDeleteProcess = (id) => {
    if (processes.length > 1) {
      setProcesses(processes.filter(process => process.id !== id));
      if (showGantt) setShowGantt(false);
    } else {
      alert('⚠️ Нельзя удалить единственный процесс');
    }
  };

  const handleSave = () => {
    console.log({
      startDateTime: startDate && startTime ? `${startDate} ${startTime}` : '',
      endDateTime: endDate && endTime ? `${endDate} ${endTime}` : '',
      delayReason: delayReason,
      processes: processes.filter(p => p.start || p.end || p.description)
    });
    alert('✅ Данные успешно сохранены! Проверьте консоль (F12)');
  };

  // Вспомогательная функция для перевода "ЧЧ:ММ" в минуты от начала суток
  const timeToMinutes = (timeStr) => {
    if (!timeStr || !timeStr.includes(':')) return 0;
    const [hours, minutes] = timeStr.split(':').map(Number);
    return (hours || 0) * 60 + (minutes || 0);
  };

  // ← Новая функция расчета диаграммы
  const handleCalculateGantt = () => {
    const filledProcesses = processes.filter(p => p.start && p.end);

    if (filledProcesses.length === 0) {
      alert('⚠️ Заполните время начала и окончания хотя бы для одного процесса!');
      return;
    }

    const invalidProcesses = filledProcesses.filter(p => {
      const startMins = timeToMinutes(p.start);
      const endMins = timeToMinutes(p.end);
      return endMins <= startMins;
    });

    if (invalidProcesses.length > 0) {
      const names = invalidProcesses.map(p => p.name).join(', ');
      alert(`⚠️ У процессов "${names}" время окончания должно быть позже времени начала!`);
      return;
    }

    setShowGantt(true);
  };

  return (
    <div className="flisi-page">
      <div className="flisi-container">
        {/* Header */}
        <div className="flisi-header">
          <div className="header-content">
            <div className="flisi-badge">
              <span className="bot-icon">📊</span>
            </div>
            <div className="header-info">
              <h1 className="chat-title">Аналитика ликвидации</h1>
              <p className="chat-subtitle">Управление процессами и визуализация сроков</p>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="flisi-card">

          {/* Timeline Inputs */}
          <div className="flisi-section">
            <h2 className="flisi-section-title">🚀 Временные рамки ликвидации</h2>
            <div className="flisi-timeline-grid">
              <div className="flisi-timeline-block">
                <div className="flisi-timeline-block-header">
                  <div className="flisi-icon-box icon-start">🚀</div>
                  <div>
                    <div className="flisi-label">СТАРТ</div>
                    <div className="flisi-label-title">Начало работ</div>
                  </div>
                </div>
                <div className="flisi-input-row">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="flisi-input flisi-focus-start"
                  />
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="flisi-input flisi-focus-start"
                  />
                </div>
              </div>

              <div className="flisi-timeline-block">
                <div className="flisi-timeline-block-header">
                  <div className="flisi-icon-box icon-end">🏁</div>
                  <div>
                    <div className="flisi-label">ФИНИШ</div>
                    <div className="flisi-label-title">Окончание работ</div>
                  </div>
                </div>
                <div className="flisi-input-row">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="flisi-input flisi-focus-end"
                  />
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="flisi-input flisi-focus-end"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Processes List */}
          <div className="flisi-section">
            <div className="flisi-section-header">
              <h2 className="flisi-section-title">📋 Детализация процессов</h2>
              <p className="flisi-section-desc">Заполните временные метки для каждого этапа работ</p>
            </div>
            <div className="flisi-table-wrapper">
              <div className="flisi-table-header">
                <div>Этап</div>
                <div>Начало</div>
                <div>Окончание</div>
                <div>Описание</div>
                <div style={{ width: '40px' }}></div>
              </div>
              <div className="flisi-table-body">
                {processes.map((process, index) => (
                  <div className="flisi-table-row" key={process.id}>
                    <div className="flisi-process-name">
                      <span className="flisi-process-number">{index + 1}</span>
                      <input
                        type="text"
                        value={process.name}
                        onChange={(e) => handleProcessChange(process.id, 'name', e.target.value)}
                        className="flisi-input flisi-input-name"
                      />
                    </div>
                    <input
                      type="time"
                      value={process.start}
                      onChange={(e) => handleProcessChange(process.id, 'start', e.target.value)}
                      className="flisi-input flisi-focus-start"
                    />
                    <input
                      type="time"
                      value={process.end}
                      onChange={(e) => handleProcessChange(process.id, 'end', e.target.value)}
                      className="flisi-input flisi-focus-end"
                    />
                    <input
                      type="text"
                      placeholder="Детали процесса..."
                      value={process.description}
                      onChange={(e) => handleProcessChange(process.id, 'description', e.target.value)}
                      className="flisi-input"
                    />
                    <button
                      onClick={() => handleDeleteProcess(process.id)}
                      className="flisi-btn-delete"
                      title="Удалить процесс"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => {
                const newId = Math.max(...processes.map(p => p.id), 0) + 1;
                setProcesses([...processes, { id: newId, name: 'Новый процесс', start: '', end: '', description: '' }]);
                if (showGantt) setShowGantt(false);
              }}
              className="flisi-btn-add"
            >
              ➕ Добавить процесс
            </button>
          </div>

          {/* Delay Reason */}
          <div className="flisi-section">
            <label className="flisi-label">⚠️ Причина задержки (если есть)</label>
            <textarea
              value={delayReason}
              onChange={(e) => setDelayReason(e.target.value)}
              rows="3"
              placeholder="Укажите причины, повлиявшие на сроки ликвидации..."
              className="flisi-input flisi-textarea"
            />
          </div>

          {/* Gantt Chart Section */}
          <div className="flisi-section">
            <div className="flisi-section-header">
              <h2 className="flisi-section-title">📊 Диаграмма Ганта</h2>
              <p className="flisi-section-desc">
                {showGantt
                  ? 'Визуализация процессов на основе введенных временных меток'
                  : 'Заполните данные выше и нажмите кнопку для построения диаграммы'}
              </p>
            </div>

            {/* Кнопка расчета */}
            <button
              onClick={handleCalculateGantt}
              className="flisi-btn-calculate"
            >
              {showGantt ? '🔄 Пересчитать диаграмму' : '📊 Рассчитать диаграмму'}
            </button>

            {/* Условный рендер: заглушка или диаграмма */}
            {!showGantt ? (
              <div className="flisi-gantt-placeholder">
                <div className="flisi-gantt-placeholder-icon">📊</div>
                <h3 className="flisi-gantt-placeholder-title">Диаграмма не построена</h3>
                <p className="flisi-gantt-placeholder-desc">
                  Заполните время начала и окончания для процессов, затем нажмите кнопку выше
                </p>
              </div>
            ) : (
              <div className="gantt-chart">
                <div className="gantt-header">
                  <div className="gantt-label-col">Процесс</div>
                  <div className="gantt-timeline-col">
                    {['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'].map(time => (
                      <div key={time} className="gantt-time-marker">{time}</div>
                    ))}
                  </div>
                </div>
                <div className="gantt-body">
                  {processes.map((process) => {
                    const startMins = timeToMinutes(process.start);
                    const endMins = timeToMinutes(process.end);
                    const isValid = process.start && process.end && endMins > startMins;

                    const left = isValid ? (startMins / 1440) * 100 : 0;
                    const width = isValid ? Math.max(((endMins - startMins) / 1440) * 100, 1.5) : 0;

                    return (
                      <div key={process.id} className="gantt-row">
                        <div className="gantt-label" title={process.name}>{process.name}</div>
                        <div className="gantt-track">
                          {isValid && (
                            <div
                              className="gantt-bar"
                              style={{ left: `${left}%`, width: `${width}%` }}
                              title={`${process.name}: ${process.start} – ${process.end}`}
                            >
                              <span className="gantt-bar-text">{process.start} – {process.end}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flisi-actions-section">
            <button onClick={handleSave} className="flisi-btn-save">
              💾 Сохранить данные
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};