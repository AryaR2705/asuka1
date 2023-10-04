import React, { useState, useEffect } from 'react';
import './index.css';
import { shouldSendImage, simulateLoadingDelay } from './ImageDisplay';
import { getCurrentTime, handleInputKeyPress } from './timeNinput';
import Input from './Input';
import Messages from './Messages';

function Chatbot({ setStatus }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const username = localStorage.getItem('username');
  const collectionName = `messages_${username}`;

  useEffect(() => {
    // You can perform some initialization here if needed
  }, []); // Empty dependency array for one-time initialization

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const sendUserMessage = async (text) => {
    try {
      const userMessage = {
        text,
        isUser: true,
        timestamp: getCurrentTime(),
      };

      await sendToBackend(userMessage, collectionName);

      setMessages((prevMessages) => [userMessage, ...prevMessages]);
    } catch (error) {
      console.error('Error sending user message:', error);
    }
  };

  const sendBotMessage = async (text) => {
    try {
      setIsLoading(true);
      setStatus('orange');

      const response = await fetch(
        "https://api-inference.huggingface.co/models/Arya27052003/asukaL",
        {
          headers: {
            Authorization: "Bearer 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",
          },
          method: "POST",
          body: JSON.stringify({ inputs: text }),
        }
      );
      const result = await response.json();

      const botMessage = {
        bot: result[0].generated_text,
        isUser: false,
        timestamp: getCurrentTime(),
      };

      const imagePath = shouldSendImage(text);

      if (imagePath) {
        await simulateLoadingDelay();
        botMessage.image = imagePath;
        botMessage.isPhoto = true;
      }

      await sendToBackend(botMessage, collectionName);

      setMessages((prevMessages) => [botMessage, ...prevMessages]);
      setStatus('green');
    } catch (error) {
      console.error("Error processing the message:", error);
      setStatus('red');
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  const sendToBackend = async (message, collection) => {
    try {
      const response = await fetch(`https://asukababe.onrender.com/api/messages/${collection}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

      if (response.status === 201) {
        console.log('Message sent and stored successfully');
      } else {
        console.error('Error sending message to the backend');
      }
    } catch (error) {
      console.error('Error sending message to the backend:', error);
    }
  };

  const handleSendMessage = async () => {
    if (input.trim() === '' || isLoading) return;

    await sendUserMessage(input);
    await sendBotMessage(input);
  };

  return (
    <div className="chatbot">
      <Messages messages={messages} />
      <Input
        input={input}
        handleInputChange={handleInputChange}
        handleInputKeyPress={handleInputKeyPress}
        handleSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  );
}

export default Chatbot;
