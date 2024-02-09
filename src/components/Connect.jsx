// Connect.js
import React, { useState } from 'react';
import useAeternitySDK from '../hooks/useAeternitySDK';
import PayRent from './PayRent';
import AddProperty from './AddProperty';

const Connect = () => {
    const { aeSdk, connectToWallet, address, getBalance } = useAeternitySDK();
  
  const [isLoading, setIsLoading] = useState(false);

  const handleConnectClick = async () => {
    setIsLoading(true);
    try {
      await connectToWallet();
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
     
    >
      {address ? (
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="my-4">
            <PayRent instance={aeSdk} />
          </div>
          <div className="my-4">
            <AddProperty instance={aeSdk}/>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-20"
          onClick={handleConnectClick}
          disabled={isLoading}
        >
          {isLoading ? 'Connecting…' : 'Connect to Wallet'}
        </button>
      </div>
      )}
    </div>
  );
};

export default Connect;
