// Register.js
import React, { useState } from 'react';
import { Navigate } from 'react-router';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:8080/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, username, password }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      Navigate('/user')

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-heading">Register</h2>
      <form className="register-form" onSubmit={handleRegister}>
        <input className="register-input" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
        <input className="register-input" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
        <input className="register-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input className="register-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button className="register-button" type="submit">Register</button>
      </form>
      {error && <p className="register-error">{error}</p>}
    </div>
  );
};

export default Register;