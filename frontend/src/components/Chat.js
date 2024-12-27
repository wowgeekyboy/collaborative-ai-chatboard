import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import apiClient from '../utils/apiClient';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Chat.css';

// Initialize socket connection outside of component
const socket = io('http://localhost:5001', {
  withCredentials: true,
  transports: ['websocket', 'polling'],
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  autoConnect: true
});

const Chat = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Add socket error handling
    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    socket.on('connect', () => {
      console.log('Socket connected successfully');
    });

    // Fetch initial messages from the backend
    const fetchMessages = async () => {
      try {
        const { data } = await apiClient.get('/api/chat');
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    // Listen for new messages
    socket.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('user_typing', () => {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000); // Typing indicator duration
    });

    return () => {
      socket.off('connect_error');
      socket.off('connect');
      socket.off('receive_message');
      socket.off('user_typing');
    };
  }, []);

  const sendMessage = async () => {
    if (!newMessage.trim()) return; // Prevent sending empty messages
    try {
      const messageData = { message: newMessage };
      const { data } = await apiClient.post('/api/chat', messageData);
      socket.emit('send_message', data);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    } else {
      socket.emit('user_typing'); // Emit typing event
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat Room</h2>
        <span>Welcome, {user?.username}</span>
      </div>
      <div className="messages-container">
        {messages.map((msg) => (
          <div 
            key={msg._id} 
            className={`message ${msg.sender._id === user?.id ? 'sent' : 'received'}`}
          >
            <div className="message-content">
              <strong>{msg.sender.username}:</strong> {msg.message}
            </div>
          </div>
        ))}
        {isTyping && <div className="typing-indicator">Someone is typing...</div>}
        <div ref={messagesEndRef} />
      </div>
      <div className="message-input-container">
        <input
          className="message-input"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
        />
        <button className="send-button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;