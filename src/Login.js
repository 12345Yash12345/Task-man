// frontend/src/components/Auth/Login.js

import React, { useState } from './node_modules/react';


import axios from './node_modules/axios';

function Login({ onLogin }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleLogin = async () => {
    try {
      // Send login request to the backend
      const response = await axios.post('http://localhost:3001/login', credentials);
      onLogin(response.data); // Pass the user data to the parent component
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <label>
        Username:
        <input type="text" value={credentials.username} onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
      </label>
      <label>
        Password:
        <input type="password" value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
      </label>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
