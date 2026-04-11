import { useState, useRef, useEffect } from 'react'
import './Ai_chat.css'

export const Ai_chat = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: 'Здравствуйте! Я ИИ-помощник по регламентам ДАВС. Чем могу помочь?', 
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateBotResponse = (userText) => {
    const responses = [
      'В архиве найдено 3 похожих происшествия. Рекомендую ознакомиться с документацией.',
      'Это нарушение пункта 4.2 регламента безопасности. Требуется заполнить форму.',
      'Запрос принят. Обрабатываю данные по базе знаний ДАВС...',
      'Рекомендую создать происшествие через соответствующий раздел меню.'
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        text: generateBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="ai-chat-fullscreen">
      <div className="chat-header">
        <div className="header-info">
          <h1>🤖 Чат по регламентам (ИИ)</h1>
          <p>Автоматизированная система поддержки решений ДАВС</p>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender === 'user' ? 'message-user' : 'message-bot'}`}
          >
            <div className="message-avatar">
              {message.sender === 'bot' ? '🤖' : '👤'}
            </div>
            <div className="message-body">
              <div className="message-header">
                <span className="message-sender">
                  {message.sender === 'user' ? 'Вы' : 'Бот регламентов'}
                </span>
                <span className="message-time">{message.timestamp}</span>
              </div>
              <div className="message-content">
                <p>{message.text}</p>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="message message-bot">
            <div className="message-avatar">🤖</div>
            <div className="message-body">
              <div className="message-content typing">
                <span className="dot">●</span>
                <span className="dot">●</span>
                <span className="dot">●</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input-form" onSubmit={handleSendMessage}>
        <div className="input-wrapper">
          <button type="button" className="btn-attach">📎</button>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Введите вопрос по регламенту..."
            disabled={isTyping}
          />
          <button type="button" className="btn-emoji">😊</button>
        </div>
        <button type="submit" disabled={!inputValue.trim() || isTyping} className="btn-send">
          ➤
        </button>
      </form>
    </div>
  )
}