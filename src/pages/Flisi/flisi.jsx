import React, { useState } from 'react';

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
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      padding: '40px 20px',
      fontFamily: "'Inter', 'Montserrat', sans-serif"
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        animation: 'fadeIn 0.5s ease-out'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            borderRadius: '100px',
            padding: '8px 20px',
            marginBottom: '20px'
          }}>
            <span style={{ color: 'white', fontWeight: '500' }}>📊 ДАВС Аналитика</span>
          </div>
          <h1 style={{
            color: 'white',
            fontSize: '2.5em',
            margin: '0 0 10px 0',
            fontWeight: '700',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            Аналитика ликвидации
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1em' }}>
            Управление процессами ликвидации происшествий
          </p>
        </div>

        {/* Main Card */}
        <div style={{
          background: 'white',
          borderRadius: '32px',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
          overflow: 'hidden'
        }}>
          {/* Timeline Section */}
          <div style={{
            background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%)',
            padding: '32px',
            borderBottom: '1px solid rgba(0,0,0,0.05)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px'
            }}>
              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '20px',
                boxShadow: '0 4px 6px -2px rgba(0,0,0,0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.2em'
                  }}>🚀</div>
                  <div>
                    <div style={{ fontSize: '0.85em', color: '#6b7280', fontWeight: '500' }}>СТАРТ</div>
                    <div style={{ fontWeight: '600', color: '#1f2937' }}>Начало ликвидации</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={{ 
                      flex: 1,
                      padding: '12px 16px',
                      borderRadius: '14px',
                      border: '2px solid #e5e7eb',
                      fontSize: '0.95em',
                      transition: 'all 0.2s',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                  <input 
                    type="time" 
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    style={{ 
                      flex: 1,
                      padding: '12px 16px',
                      borderRadius: '14px',
                      border: '2px solid #e5e7eb',
                      fontSize: '0.95em',
                      transition: 'all 0.2s',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
              </div>

              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '20px',
                boxShadow: '0 4px 6px -2px rgba(0,0,0,0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.2em'
                  }}>🏁</div>
                  <div>
                    <div style={{ fontSize: '0.85em', color: '#6b7280', fontWeight: '500' }}>ФИНИШ</div>
                    <div style={{ fontWeight: '600', color: '#1f2937' }}>Окончание ликвидации</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    style={{ 
                      flex: 1,
                      padding: '12px 16px',
                      borderRadius: '14px',
                      border: '2px solid #e5e7eb',
                      fontSize: '0.95em',
                      transition: 'all 0.2s',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#f5576c'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                  <input 
                    type="time" 
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    style={{ 
                      flex: 1,
                      padding: '12px 16px',
                      borderRadius: '14px',
                      border: '2px solid #e5e7eb',
                      fontSize: '0.95em',
                      transition: 'all 0.2s',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#f5576c'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Processes Section */}
          <div style={{ padding: '32px' }}>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.5em', margin: '0 0 8px 0', color: '#1f2937' }}>
                📋 Процессы ликвидации
              </h2>
              <p style={{ color: '#6b7280', margin: 0 }}>Заполните временные метки для каждого этапа работ</p>
            </div>

            <div style={{
              overflowX: 'auto',
              borderRadius: '20px',
              border: '1px solid #e5e7eb',
              background: 'white'
            }}>
              <div style={{ minWidth: '800px' }}>
                {/* Table Header */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1.5fr 0.8fr 0.8fr 2fr',
                  background: '#f9fafb',
                  borderBottom: '1px solid #e5e7eb',
                  padding: '16px 20px',
                  fontWeight: '600',
                  color: '#374151',
                  fontSize: '0.9em'
                }}>
                  <div>Процесс</div>
                  <div>Время начала</div>
                  <div>Время окончания</div>
                  <div>Описание</div>
                </div>

                {/* Table Rows */}
                {processes.map((process, index) => (
                  <div key={process.id} style={{
                    display: 'grid',
                    gridTemplateColumns: '1.5fr 0.8fr 0.8fr 2fr',
                    padding: '12px 20px',
                    borderBottom: index < processes.length - 1 ? '1px solid #f3f4f6' : 'none',
                    transition: 'background 0.2s',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      fontWeight: '500',
                      color: '#1f2937',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      <span style={{
                        width: '28px',
                        height: '28px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '8px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.75em',
                        fontWeight: 'bold'
                      }}>{index + 1}</span>
                      {process.name}
                    </div>
                    <input 
                      type="time"
                      value={process.start}
                      onChange={(e) => handleProcessChange(process.id, 'start', e.target.value)}
                      style={{ 
                        padding: '10px 12px',
                        borderRadius: '12px',
                        border: '1.5px solid #e5e7eb',
                        fontSize: '0.9em',
                        transition: 'all 0.2s',
                        outline: 'none',
                        width: '95%'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#667eea'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                    <input 
                      type="time"
                      value={process.end}
                      onChange={(e) => handleProcessChange(process.id, 'end', e.target.value)}
                      style={{ 
                        padding: '10px 12px',
                        borderRadius: '12px',
                        border: '1.5px solid #e5e7eb',
                        fontSize: '0.9em',
                        transition: 'all 0.2s',
                        outline: 'none',
                        width: '95%'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#f5576c'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                    <input 
                      type="text"
                      placeholder="Детали процесса..."
                      value={process.description}
                      onChange={(e) => handleProcessChange(process.id, 'description', e.target.value)}
                      style={{ 
                        padding: '10px 12px',
                        borderRadius: '12px',
                        border: '1.5px solid #e5e7eb',
                        fontSize: '0.9em',
                        transition: 'all 0.2s',
                        outline: 'none',
                        width: '95%'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#10b981'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
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
              style={{
                marginTop: '16px',
                padding: '10px 20px',
                background: 'white',
                border: '2px dashed #d1d5db',
                borderRadius: '14px',
                color: '#6b7280',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => { e.target.style.borderColor = '#667eea'; e.target.style.color = '#667eea'; }}
              onMouseLeave={(e) => { e.target.style.borderColor = '#d1d5db'; e.target.style.color = '#6b7280'; }}
            >
              ➕ Добавить процесс
            </button>
          </div>

          {/* Delay Reason Section */}
          <div style={{
            padding: '32px',
            background: '#f9fafb',
            borderTop: '1px solid #e5e7eb',
            borderBottom: '1px solid #e5e7eb'
          }}>
            <div style={{ maxWidth: '800px' }}>
              <label style={{ 
                display: 'block', 
                fontWeight: '600', 
                marginBottom: '8px',
                color: '#374151'
              }}>
                ⚠️ Причина задержки
              </label>
              <textarea
                value={delayReason}
                onChange={(e) => setDelayReason(e.target.value)}
                rows="3"
                placeholder="Укажите причины, повлиявшие на сроки ликвидации..."
                style={{ 
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: '16px',
                  border: '1.5px solid #e5e7eb',
                  fontSize: '0.95em',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#f59e0b'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>
          </div>

          {/* Actions & Gantt */}
          <div style={{ padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
              <button 
                onClick={handleSave}
                style={{
                  padding: '14px 48px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  borderRadius: '40px',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '1em',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
                onMouseEnter={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)'; }}
                onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)'; }}
              >
                💾 Сохранить данные
              </button>
            </div>

            {/* Gantt Chart Placeholder */}
            <div style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              borderRadius: '24px',
              padding: '60px 40px',
              textAlign: 'center',
              border: '2px dashed #f59e0b',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-10%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)',
                borderRadius: '50%'
              }}></div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: '4em', marginBottom: '16px' }}>📊</div>
                <h3 style={{ fontSize: '1.5em', margin: '0 0 8px 0', color: '#92400e' }}>
                  Диаграмма Ганта
                </h3>
                <p style={{ color: '#b45309', margin: 0 }}>
                  Здесь будет отображаться визуализация процессов ликвидации
                </p>
                <p style={{ fontSize: '0.85em', color: '#d97706', marginTop: '12px' }}>
                  на основе введенных временных меток
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        div {
          animation: fadeIn 0.5s ease-out;
        }
        input, textarea, button {
          transition: all 0.2s ease;
        }
      `}</style>
    </div>
  );
};