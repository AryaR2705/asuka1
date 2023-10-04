// Messages.js
import React from 'react';
import femaleProfileImage from './asuka.png'; // Replace with your path

function Messages({ messages }) {
  return (
    <div className="chatbot-messages" style={{ height: 200, overflowY: 'auto' }}>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`chat-message ${message.isUser ? 'user' : 'bot'} ${message.isPhoto ? 'photo' : ''}`}
        >
          {message.isUser ? (
            <>
              {message.timestamp} - {message.text}
            </>
          ) : (
            <>
              <div>
                <img src={femaleProfileImage} alt="Female Bot" className="profile-picture" />
                {message.timestamp} - {message.bot}
              </div>
              {message.isPhoto && (
                <div>
                  <img
                    src={message.image}
                    alt="Photo"
                    className={`chat-photo ${message.isSmall ? 'small' : ''}`}
                  />
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Messages;
