// src/pages/Ai_chat/Ai_chat.jsx
import { useState, useRef, useEffect } from 'react';
import './AiChat.css';

export const AiChat = () => {
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
  
  // Состояние для прикрепленного файла
  const [attachedFile, setAttachedFile] = useState(null);
  const fileInputRef = useRef(null);
  
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

  // Обработчик выбора файла
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachedFile({
        name: file.name,
        type: file.type,
        preview: URL.createObjectURL(file)
      });
    }
  };

  // Обработчик удаления файла из превью
  const handleRemoveFile = () => {
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim() && !attachedFile) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      attachment: attachedFile
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setAttachedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
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
          <button className="btn-icon btn-history" title="История">🕐</button>
          <button className="btn-icon btn-settings" title="Настройки">⚙️</button>
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
                {message.text && <p className="message-text">{message.text}</p>}
                {message.attachment && (
                  <div className="message-attachment">
                    <img src={message.attachment.preview} alt="attached" className="msg-attachment-img" />
                    <span className="msg-attachment-name">{message.attachment.name}</span>
                  </div>
                )}
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
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*"
          style={{ display: 'none' }}
        />

        {attachedFile && (
          <div className="attachment-preview">
            <img src={attachedFile.preview} alt="preview" className="attachment-thumb" />
            <span className="attachment-name">{attachedFile.name}</span>
            <button 
              type="button" 
              className="btn-remove-attachment" 
              onClick={handleRemoveFile}
              title="Удалить вложение"
            >
              ✕
            </button>
          </div>
        )}

        <div className="input-container">
          <div className="input-actions">
            <button 
              type="button" 
              className="btn-tool" 
              title="Прикрепить файл"
              onClick={() => fileInputRef.current?.click()}
            >
              📎
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
          <button type="button" className="btn-tool" title="Эмодзи">😊</button>
          <button 
            type="submit" 
            disabled={(!inputValue.trim() && !attachedFile) || isTyping} 
            className={`btn-send ${(!inputValue.trim() && !attachedFile) || isTyping ? 'disabled' : ''}`}
            title="Отправить"
          >
            ➤
          </button>
        </div>
      </form>
    </div>
  );
};