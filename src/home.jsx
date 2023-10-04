import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import App from './App.jsx';
import './home.css';

function Home() {
  const [username, setUsername] = useState('');
  const [isMessageSent, setIsMessageSent] = useState(false); // New state variable
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

const handleSubmit = async (event) => {
  event.preventDefault();
  if (username.length >= 4 && !isMessageSent) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    };

    try {
      // Send the username to the backend
      const response = await fetch(`https://asukababe.onrender.com/api/messages/${username}`, requestOptions); // Use username to specify the collection name

      if (response.status === 201) {
        // Lock the submit button
        setIsMessageSent(true);
        // Redirect to the '/home' route if the server accepts the username
        navigate('/home');
        // Set the username in local storage after a successful response
        localStorage.setItem('username', username);
      } else {
        // Handle other response statuses as needed
        alert('Failed to send username to the server.');
      }
    } catch (error) {
      console.error('Error sending username:', error);
      alert('An error occurred while sending the username.');
    }
  } else if (isMessageSent) {
    alert('Message already sent.');
  } else {
    alert('Username must be at least 4 characters long.');
  }
};


localStorage.setItem('username', username);

  return (
    <>
      <h1>Username Page</h1>
      <div className="username-page">
        <form onSubmit={handleSubmit}>
          <label>
            Enter your name
            <p></p>
            <input
              type="text"
              value={username}
              onChange={handleInputChange}
              required
              minLength="4"
              placeholder="your name"
            />
          </label>
          <button type="submit" disabled={isMessageSent}>Submit</button> {/* Disable button when message is sent */}
        </form>
      </div>
    </>
  );
}

export default Home;
