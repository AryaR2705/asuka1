// Input.js
import React from 'react';

function Input({ input, handleInputChange, handleInputKeyPress, handleSendMessage, isLoading }) {
  return (
    <div className="chatbot-input" style={{ marginBottom: 10 }}>
      <input
        type="text"
        placeholder="Enter here"
        value={input}
        onChange={handleInputChange}
        onKeyPress={(e) => handleInputKeyPress(e, isLoading, handleSendMessage)}
      />
      <button onClick={handleSendMessage} disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
}

export default Input;