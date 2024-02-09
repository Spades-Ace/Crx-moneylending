import React, { useState, useEffect } from 'react';
import { AE_AMOUNT_FORMATS } from '@aeternity/aepp-sdk';
import useAeternitySDK from '../hooks/useAeternitySDK';

import './styles/connectWallet.css';

const Connect = () => {
  const { aeSdk, connectToWallet, address, getBalance } = useAeternitySDK();
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const balance = await aeSdk.getBalance(address, { format: AE_AMOUNT_FORMATS.AE });
        setBalance(balance);
      } catch (error) {
        console.error(error.message);
      }
    };

    if (address) {
      fetchBalance();
    }
  }, [aeSdk, address, getBalance]);

  const handleConnectClick = async () => {
    try {
      await connectToWallet();
      console.log(aeSdk);
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      console.error(error.message);
    } finally {
    }
  };

  return (
    <div>
      <div className="wallet-info-container">
        <div className="wallet-info">
          {address ? (
            <>
              <p className='balance'>{balance} ETH</p>
            </>
          ) : (
            <button onClick={handleConnectClick}>Connect to Wallet</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Connect;
