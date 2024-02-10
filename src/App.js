import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import User from './pages/user';
import WalletContext from './pages/WalletContext'; // Import WalletContext

const App = () => {
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(null);

  // console.log('App.js - address:', address);
  // console.log('App.js - balance:', balance);

  return (
    <WalletContext.Provider value={{ address, balance, setAddress, setBalance }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<User />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </WalletContext.Provider>
  );
};

export default App;
