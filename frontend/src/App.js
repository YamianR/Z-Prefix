import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ItemList from './components/Item/ItemList';
import CreateItem from './components/Item/CreateItem';
import ItemDetail from './components/Item/ItemDetail';
import UserPage from './components/User/UserPage'; // Create UserPage component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/items" element={<ItemList />} />
        <Route path="/create-item" element={<CreateItem />} />
        <Route path="/item/:id" element={<ItemDetail />} />
        <Route path="/user" element={<UserPage />} /> 
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h2>Welcome to Inventory Manager</h2>
        <p>What would you like to do?</p>
        <div className="home-buttons">
          <Link to="/login" className="home-button">
            Log in
          </Link>
          <Link to="/register" className="home-button">
            Register
          </Link>
          <Link to="/items" className="home-button">
            View Items
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;