// src/pages/Ai_chat/Ai_chat.jsx
import { useState, useRef, useEffect } from 'react';
import './Ai_chat.css';

export const Ai_chat = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: 'Здравствуйте! Я ИИ-помощник по регламентам ДАВС. Чем могу помочь?', 
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userText) => {
    const responses = [
      'В архиве найдено 3 похожих происшествия. Рекомендую ознакомиться с документацией.',
      'Это нарушение пункта 4.2 регламента безопасности. Требуется заполнить форму.',
      'Запрос принят. Обрабатываю данные по базе знаний ДАВС...',
      'Рекомендую создать происшествие через соответствующий раздел меню.',
      'Согласно регламенту №12-ЖД, данное действие требует согласования с диспетчером.',
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        text: generateBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="ai-chat-container">
      {/* Header */}
      <div className="chat-header">
        <div className="header-content">
          <div className="bot-avatar">
            <span className="bot-icon">🤖</span>
            <span className="status-dot"></span>
          </div>
          <div className="header-info">
            <h1 className="chat-title">Чат по регламентам (ИИ)</h1>
            <p className="chat-subtitle">Автоматизированная система поддержки решений ДАВС</p>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn-icon btn-history" title="История">
            🕐
          </button>
          <button className="btn-icon btn-settings" title="Настройки">
            ⚙️
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        <div className="welcome-banner">
          <span className="welcome-icon">💡</span>
          <p>Задавайте вопросы по регламентам, инструкциям и типовым ситуациям. ИИ поможет найти нужную информацию.</p>
        </div>

        {messages.map((message) => (
          <div
            key={message.id}
            className={`message-wrapper ${message.sender === 'user' ? 'message-user' : 'message-bot'}`}
          >
            <div className="message-avatar">
              {message.sender === 'bot' ? (
                <span className="bot-avatar-small">🤖</span>
              ) : (
                <span className="user-avatar-small">👤</span>
              )}
            </div>
            <div className="message-content-wrapper">
              <div className="message-header">
                <span className="message-sender">
                  {message.sender === 'user' ? 'Вы' : 'Бот регламентов'}
                </span>
                <span className="message-time">{message.timestamp}</span>
              </div>
              <div className="message-bubble">
                <p className="message-text">{message.text}</p>
              </div>
              {message.sender === 'bot' && (
                <div className="message-actions">
                  <button className="btn-action" title="Копировать">📋</button>
                  <button className="btn-action" title="Полезно">👍</button>
                  <button className="btn-action" title="Не полезно">👎</button>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="message-wrapper message-bot">
            <div className="message-avatar">
              <span className="bot-avatar-small">🤖</span>
            </div>
            <div className="message-content-wrapper">
              <div className="message-bubble typing-bubble">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
              <span className="typing-label">ИИ печатает ответ...</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form className="chat-input-area" onSubmit={handleSendMessage}>
        <div className="input-container">
          <div className="input-actions">
            <button type="button" className="btn-tool" title="Прикрепить файл">
              📎
            </button>
            <button type="button" className="btn-tool" title="Вставить шаблон">
              📝
            </button>
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Введите вопрос по регламенту..."
            disabled={isTyping}
            className="chat-input"
          />
          <button type="button" className="btn-tool" title="Эмодзи">
            😊
          </button>
          <button 
            type="submit" 
            disabled={!inputValue.trim() || isTyping} 
            className={`btn-send ${(!inputValue.trim() || isTyping) ? 'disabled' : ''}`}
            title="Отправить"
          >
            ➤
          </button>
        </div>
        <p className="input-hint">
          Нажмите Enter для отправки • ИИ использует базу знаний ДАВС
        </p>
      </form>
    </div>
  );
};