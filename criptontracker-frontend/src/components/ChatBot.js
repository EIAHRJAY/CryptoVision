import React, { useState } from 'react';
import '../style/ChatBot.css';
import '../style/Navbar.css'; // Estilos personalizados
import { BsRobot } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]); // Para almacenar los mensajes
  const [inputValue, setInputValue] = useState(''); // Valor del input
  const [isLoading, setIsLoading] = useState(false); // Para mostrar indicador de carga

  // Simular autenticación, por ejemplo, desde localStorage
  const isAuthenticated = localStorage.getItem('token'); // Si hay un token, el usuario está autenticado

  const apiUrl = process.env.REACT_APP_BACKEND_URL;
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      const userMessage = { sender: 'user', text: inputValue };
      setMessages([...messages, userMessage]);
      setInputValue(''); // Limpiar input

      // Llamada al backend con el mensaje del usuario
      setIsLoading(true); // Mostrar indicador de carga
      try {
        const response = await fetch(`${apiUrl}/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: userMessage.text }), // Envía el contenido del mensaje al backend
        });

        const data = await response.json();

        if (response.ok) {
          const botMessage = { sender: 'bot', text: data.message };
          setMessages(prevMessages => [...prevMessages, botMessage]);
        } else {
          const errorMessage = { sender: 'bot', text: 'Error: ' + (data.error || 'Something went wrong') };
          setMessages(prevMessages => [...prevMessages, errorMessage]);
        }
      } catch (error) {
        setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: 'Error: ' + error.message }]);
      } finally {
        setIsLoading(false); // Deja de mostrar indicador de carga
      }
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
            {isAuthenticated ? (
              // Si el usuario está autenticado, mostrar el chat
              <>
                {messages.map((msg, index) => (
                  <div key={index} className={`message ${msg.sender}`}>
                    {msg.text}
                  </div>
                ))}
                {isLoading && <div className="message bot">Escribiendo...</div>} {/* Indicador de carga */}
              </>
            ) : (
              // Si no está autenticado, mostrar mensaje para iniciar sesión o registrarse
              <div className="message bot">
                Please log in or sign up to use the chat.
              </div>
            )}
          </div>

          {/* Si está autenticado, mostrar el input para enviar mensajes */}
          {isAuthenticated && (
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
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBot;
