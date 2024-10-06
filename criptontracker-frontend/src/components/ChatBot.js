import React, { useState } from 'react';
import '../style/ChatBot.css';
import '../style/Navbar.css'; // Estilos personalizados
import { BsRobot } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]); // Para almacenar los mensajes
  const [inputValue, setInputValue] = useState(''); // Valor del input

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { sender: 'user', text: inputValue }]);
      setInputValue(''); // Limpiar input
    }
  };

  return (
    <div>
      {/* Botón flotante */}
      <div className="chat-button Icon" onClick={toggleChat}>
        <BsRobot />
      </div>

      {/* Componente del chat */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h4>Chat</h4>
            <button className="close-btn btn " onClick={toggleChat}>X</button>
          </div>

          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-footer">
            <input 
              type="text" 
              className="chat-input" 
              placeholder="Escribe un mensaje..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button className="send-btn" onClick={handleSendMessage}><AiOutlineSend /></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
