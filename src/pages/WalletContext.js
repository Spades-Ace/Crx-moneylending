import React from 'react';

const WalletContext = React.createContext({
  address: null,
  balance: null,
  setAddress: () => {},
  setBalance: () => {},
});

export default WalletContext;
