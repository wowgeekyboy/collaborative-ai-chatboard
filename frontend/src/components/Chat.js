import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import apiClient from '../utils/apiClient';

// Initialize socket connection outside of component
const socket = io('http://localhost:5001', {
  withCredentials: true,
  transports: ['websocket', 'polling'],
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  autoConnect: true
});

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

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

    return () => {
      socket.off('connect_error');
      socket.off('connect');
      socket.off('receive_message');
    };
  }, []);

  const sendMessage = async () => {
    const messageData = { message: newMessage };
    const { data } = await apiClient.post('/chat', messageData);
    socket.emit('send_message', data); // Send message via WebSocket
    setNewMessage('');
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div>
        {messages.map((msg) => (
          <p key={msg._id}>
            <strong>{msg.sender.username}:</strong> {msg.message}
          </p>
        ))}
      </div>
      <input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;