import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { loginUser } from '../services/api';


const Register = () => {
    const [firstName, setFirstName] = useState('');
    cosnt [lastName, setLastName] = useState('');
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const history = useHistory();

    const handleRegister = async () => {
        try { 
            await registerUser(firstName, lastName, username, password);
            history.push('/login');
        } catch {error} {
            console.error('Failed to register', error.message);
        }
    };

  return (
    <div>
        <h2>Register</h2>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button onClick={handleRegister}>Register</button>
    </div>
  )
}

export default Register
