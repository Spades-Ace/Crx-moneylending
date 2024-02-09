import React, {useEffect, useState,  useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './header.css';
import logo from '../../media/images/cr-logo.png';
import useAeternitySDK from '../../hooks/useAeternitySDK';
import WalletContext from '../../pages/WalletContext';
import { AE_AMOUNT_FORMATS } from '@aeternity/aepp-sdk';

export default function Header() {
  const { address, balance } = useContext(WalletContext);
  const navigate = useNavigate(); // Get the navigate function

  console.log('Header.js - address:', address);
  console.log('Header.js - balance:', balance);

  const handleDelinkClick = () => {
    navigate('/'); // Redirect to home page
  };

  return (
		<div>
    <div className="header">
      <img src={logo} alt='logo' />
      <div className="balance-container">
        <div className="balance-info">
          Balance: {balance || 'N/A'}
        </div>
        <button onClick={handleDelinkClick}>Delink</button> {/* Add the Delink button */}
      </div>
    </div>
    {address && (
      <div className="address-info">
        Address: {address}
      </div>
    )}
  </div>
  );
};
