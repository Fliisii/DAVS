import React, { useState, useMemo } from 'react';
import './Gant.css';

export const Gant = () => {
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [delayReason, setDelayReason] = useState('');
  const [showGantt, setShowGantt] = useState(false);

  const [processes, setProcesses] = useState([
    { id: 1, name: 'Оценка обстановки', start: '09:00', end: '09:30', description: '', multiDay: false },
    { id: 2, name: 'Ограждение места работ', start: '09:30', end: '10:15', description: '', multiDay: false },
    { id: 3, name: 'Подготовка техники', start: '22:00', end: '01:30', description: 'Ночная смена', multiDay: true },
    { id: 4, name: 'Подъем вагона', start: '23:00', end: '02:00', description: '', multiDay: true },
    { id: 5, name: 'Уборка тележки', start: '13:00', end: '14:50', description: '', multiDay: false },
    { id: 6, name: 'Восстановление пути', start: '14:50', end: '16:30', description: '', multiDay: false },
  ]);

  const handleProcessChange = (id, field, value) => {
    setProcesses(processes.map(process =>
      process.id === id ? { ...process, [field]: value } : process
    ));
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

  const timeToMinutes = (timeStr) => {
    if (!timeStr || !timeStr.includes(':')) return 0;
    const [hours, minutes] = timeStr.split(':').map(Number);
    return (hours || 0) * 60 + (minutes || 0);
  };

  // Динамический расчёт шкалы времени с флагами дней
  const { totalMinutes, timeMarkers } = useMemo(() => {
    const maxEndMins = processes.reduce((max, p) => {
      if (!p.start || !p.end) return max;
      let end = timeToMinutes(p.end);
      if (p.multiDay) end += 1440;
      return Math.max(max, end);
    }, 1440);

    const total = Math.max(1440, Math.ceil(maxEndMins / 240) * 240);
    
    const markers = [];
    for (let m = 0; m <= total; m += 240) {
      const hours = Math.floor(m / 60);
      const mins = m % 60;
      const isNewDay = m % 1440 === 0; // Каждые 24 часа = новый день
      markers.push({
        time: `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`,
        isNewDay
      });
    }

    return { totalMinutes: total, timeMarkers: markers };
  }, [processes]);

  const handleCalculateGantt = () => {
    const filledProcesses = processes.filter(p => p.start && p.end);

    if (filledProcesses.length === 0) {
      alert('⚠️ Заполните время начала и окончания хотя бы для одного процесса!');
      return;
    }

    const invalidProcesses = filledProcesses.filter(p => {
      const startMins = timeToMinutes(p.start);
      let endMins = timeToMinutes(p.end);
      if (p.multiDay) endMins += 1440;
      return endMins <= startMins;
    });

    if (invalidProcesses.length > 0) {
      const names = invalidProcesses.map(p => p.name).join(', ');
      alert(`⚠️ У процессов "${names}" время окончания должно быть позже времени начала! Включите флаг "Работы более одного дня", если работы переходят через полночь.`);
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
                <div className="flisi-table-header-multiday">Мульт.</div>
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
                    <label className="flisi-multiday-label" title="Работы переходят через полночь">
                      <input 
                        type="checkbox"
                        checked={process.multiDay || false}
                        onChange={(e) => handleProcessChange(process.id, 'multiDay', e.target.checked)}
                        className="flisi-multiday-checkbox"
                      />
                      <span className="flisi-multiday-text">+1д</span>
                    </label>
                    <button 
                      onClick={() => handleDeleteProcess(process.id)}
                      className="flisi-btn-delete"
                      title="Удалить процесс"
                    >
                      ️
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button 
              onClick={() => {
                const newId = Math.max(...processes.map(p => p.id), 0) + 1;
                setProcesses([...processes, { id: newId, name: 'Новый процесс', start: '', end: '', description: '', multiDay: false }]);
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
                  ? `Визуализация процессов (шкала: ${totalMinutes / 60} часов) • 🟢 начало • 🔴 конец`
                  : 'Заполните данные выше и нажмите кнопку для построения диаграммы'}
              </p>
            </div>

            <button
              onClick={handleCalculateGantt}
              className="flisi-btn-calculate"
            >
              {showGantt ? '🔄 Пересчитать диаграмму' : '📊 Рассчитать диаграмму'}
            </button>

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
                    {timeMarkers.map((marker, idx) => (
                      <div 
                        key={idx} 
                        className={`gantt-time-marker ${marker.isNewDay ? 'gantt-time-marker-day' : ''}`}
                      >
                        {marker.time}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="gantt-body">
                  {processes.map((process) => {
                    const startMins = timeToMinutes(process.start);
                    let endMins = timeToMinutes(process.end);
                    if (process.multiDay) endMins += 1440;
                    
                    const isValid = process.start && process.end && endMins > startMins;
                    
                    const left = isValid ? (startMins / totalMinutes) * 100 : 0;
                    const width = isValid ? Math.max(((endMins - startMins) / totalMinutes) * 100, 1.5) : 0;
                    
                    const timeText = process.multiDay 
                      ? `${process.start} → ${process.end} (+1д)` 
                      : `${process.start} – ${process.end}`;

                    // Показывать текст только если ширина >= 5% (примерно 50px на 1000px)
                    const showText = width >= 5;

                    return (
                      <div key={process.id} className={`gantt-row ${process.multiDay ? 'gantt-row-multiday' : ''}`}>
                        <div className="gantt-label" title={process.name}>
                          {process.name}
                          {process.multiDay && <span className="gantt-multiday-badge">+1д</span>}
                        </div>
                        <div className="gantt-track">
                          {isValid && (
                            <div 
                              className={`gantt-bar ${!showText ? 'gantt-bar-small' : ''}`}
                              style={{ left: `${left}%`, width: `${width}%` }}
                              title={`${process.name}: ${timeText}`}
                            >
                              {showText && (
                                <span className="gantt-bar-text">{timeText}</span>
                              )}
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