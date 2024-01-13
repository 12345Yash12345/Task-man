// frontend/src/components/Auth/Signup.js

import React, { useState } from './node_modules/react';
import axios from './node_modules/axios';



function Signup({ onSignup }) {
  const [userInfo, setUserInfo] = useState({ username: '', password: '' });

  const handleSignup = async () => {
    try {
      // Send signup request to the backend
      const response = await axios.post('http://localhost:3001/signup', userInfo);
      onSignup(response.data); // Pass the user data to the parent component
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <label>
        Username:
        <input type="text" value={userInfo.username} onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })} />
      </label>
      <label>
        Password:
        <input type="password" value={userInfo.password} onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })} />
      </label>
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;
