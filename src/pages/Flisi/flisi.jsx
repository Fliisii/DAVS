import React, { useState } from 'react';
import './Flisi.css';

export const Flisi = () => {
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [delayReason, setDelayReason] = useState('');
  
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
  };

  const handleSave = () => {
    console.log({
      startDateTime: startDate && startTime ? `${startDate} ${startTime}` : '',
      endDateTime: endDate && endTime ? `${endDate} ${endTime}` : '',
      delayReason: delayReason,
      processes: processes.filter(p => p.start || p.end || p.description)
    });
    alert('✅ Данные сохранены! Проверьте консоль (F12)');
  };

  return (
    <div className="flisi-page">
      <div className="flisi-container">
        {/* Header */}
        <div className="flisi-header">
          <div className="flisi-badge">
            <span>📊 ДАВС Аналитика</span>
          </div>
          <h1 className="flisi-title">Аналитика ликвидации</h1>
          <p className="flisi-subtitle">Управление процессами ликвидации происшествий</p>
        </div>

        {/* Main Card */}
        <div className="flisi-card">
          {/* Timeline Section */}
          <div className="flisi-timeline-section">
            <div className="flisi-timeline-grid">
              {/* Start Block */}
              <div className="flisi-timeline-block">
                <div className="flisi-timeline-block-header">
                  <div className="flisi-icon-box icon-start">🚀</div>
                  <div>
                    <div className="flisi-label">СТАРТ</div>
                    <div className="flisi-label-title">Начало ликвидации</div>
                  </div>
                </div>
                <div className="flisi-input-row">
                  <input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="flisi-input flisi-input-date flisi-focus-start"
                  />
                  <input 
                    type="time" 
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="flisi-input flisi-input-time flisi-focus-start"
                  />
                </div>
              </div>

              {/* End Block */}
              <div className="flisi-timeline-block">
                <div className="flisi-timeline-block-header">
                  <div className="flisi-icon-box icon-end">🏁</div>
                  <div>
                    <div className="flisi-label">ФИНИШ</div>
                    <div className="flisi-label-title">Окончание ликвидации</div>
                  </div>
                </div>
                <div className="flisi-input-row">
                  <input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="flisi-input flisi-input-date flisi-focus-end"
                  />
                  <input 
                    type="time" 
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="flisi-input flisi-input-time flisi-focus-end"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Processes Section */}
          <div className="flisi-processes-section">
            <div className="flisi-section-header">
              <h2 className="flisi-section-title">📋 Процессы ликвидации</h2>
              <p className="flisi-section-desc">Заполните временные метки для каждого этапа работ</p>
            </div>

            <div className="flisi-table-wrapper">
              <div className="flisi-table-inner">
                {/* Table Header */}
                <div className="flisi-table-header">
                  <div>Процесс</div>
                  <div>Время начала</div>
                  <div>Время окончания</div>
                  <div>Описание</div>
                </div>

                {/* Table Rows */}
                {processes.map((process, index) => (
                  <div className="flisi-table-row" key={process.id}>
                    <div className="flisi-process-name">
                      <span className="flisi-process-number">{index + 1}</span>
                      {process.name}
                    </div>
                    <input 
                      type="time"
                      value={process.start}
                      onChange={(e) => handleProcessChange(process.id, 'start', e.target.value)}
                      className="flisi-input flisi-input-small flisi-focus-start"
                    />
                    <input 
                      type="time"
                      value={process.end}
                      onChange={(e) => handleProcessChange(process.id, 'end', e.target.value)}
                      className="flisi-input flisi-input-small flisi-focus-end"
                    />
                    <input 
                      type="text"
                      placeholder="Детали процесса..."
                      value={process.description}
                      onChange={(e) => handleProcessChange(process.id, 'description', e.target.value)}
                      className="flisi-input flisi-input-small flisi-focus-desc"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => {
                const newId = Math.max(...processes.map(p => p.id), 0) + 1;
                setProcesses([...processes, { id: newId, name: 'Новый процесс', start: '', end: '', description: '' }]);
              }}
              className="flisi-btn-add"
            >
              ➕ Добавить процесс
            </button>
          </div>

          {/* Delay Reason Section */}
          <div className="flisi-delay-section">
            <div className="flisi-delay-inner">
              <label className="flisi-delay-label">⚠️ Причина задержки</label>
              <textarea
                value={delayReason}
                onChange={(e) => setDelayReason(e.target.value)}
                rows="3"
                placeholder="Укажите причины, повлиявшие на сроки ликвидации..."
                className="flisi-input flisi-textarea flisi-focus-delay"
              />
            </div>
          </div>

          {/* Actions & Gantt */}
          <div className="flisi-actions-section">
            <div className="flisi-save-wrapper">
              <button 
                onClick={handleSave}
                className="flisi-btn-save"
              >
                💾 Сохранить данные
              </button>
            </div>

            {/* Gantt Chart Placeholder */}
            <div className="flisi-gantt">
              <div className="flisi-gantt-bg-circle"></div>
              <div className="flisi-gantt-content">
                <div className="flisi-gantt-icon">📊</div>
                <h3 className="flisi-gantt-title">Диаграмма Ганта</h3>
                <p className="flisi-gantt-desc">Здесь будет отображаться визуализация процессов ликвидации</p>
                <p className="flisi-gantt-subdesc">на основе введенных временных меток</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};