// frontend/src/components/Auth/Logout.js

import React from './node_modules/react';


function Logout({ onLogout }) {
  const handleLogout = () => {
    // Call the onLogout callback to log out the user
    onLogout();
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
