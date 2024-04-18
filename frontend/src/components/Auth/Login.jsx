import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../services/api';


function Login() {
  const [username, setuserName] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    try {
      await loginUser(username, password);
      history.push('/items');
    } catch (error) {
      console.error("Failed to login", error.message);
    }
  };


  return (
    <div>
      <h1>Loging</h1>
      <input type="text" value={username} onChange={(e) => setuserName(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login
