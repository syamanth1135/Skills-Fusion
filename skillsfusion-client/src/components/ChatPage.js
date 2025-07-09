import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './ChatPage.css';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const senderEmail = localStorage.getItem('userEmail');
  const receiverEmail = searchParams.get('to');

  const fetchMessages = async () => {
    try {
      const res = await fetch(
        `http://localhost:8081/api/chat/messages?user1=${senderEmail}&user2=${receiverEmail}`
      );
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!text.trim()) return;
    try {
      await fetch('http://localhost:8081/api/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderEmail,
          receiverEmail,
          message: text,
        }),
      });
      setText('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 1000);
    return () => clearInterval(interval);
  }, [receiverEmail]);

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="chat-header-row">
          <button onClick={() => navigate('/')} className="back-button">← Back</button>
          <h2 className="chat-header">Chat with {receiverEmail}</h2>
        </div>

        <div className="message-area">
          {messages.map((msg, index) => (
            <div key={index} className="message-row">
              <div
                className={`message-bubble ${
                  msg.senderEmail === senderEmail ? 'message-sent' : 'message-received'
                }`}
              >
                <p style={{ margin: 0 }}>{msg.message}</p>
                <span className="timestamp">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="chat-input-area">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="chat-input"
            placeholder="Type a message..."
          />
          <button onClick={sendMessage} className="send-button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
