import React, { useState } from 'react';
import './app.css';
import Chatbot from './Chatbot.jsx';

function App() {
  // Add a state to track the chatbot's status (green, yellow, red)
  const [chatbotStatus, setStatus] = useState('green');

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Asuka Soryu
          {/* Add the circle element with a dynamic class based on chatbotStatus */}
          <div className={`status-circle ${chatbotStatus}`} style={{ marginLeft: '25px' }} />
        </h1>
      </header>
      <main>
        {/* Pass the setStatus function as a prop to Chatbot */}
        <Chatbot setStatus={setStatus} />
      </main>
      
      IF THE ABOVE LIGHT IS RED. WAIT 15-20 SECONDS AND TRY AGAIN.
    </div>
  );
}

export default App;

