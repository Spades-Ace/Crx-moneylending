import React, { useContext, useState } from 'react';
import './styles/user.css';
import Header from './components/header';
//import { useNavigate } from 'react-router-dom';
//import { m } from 'framer-motion';
import multi from './../contract/multisig.json';
import { AeSdk, Node } from '@aeternity/aepp-sdk';
import WalletContext from './WalletContext';

const aci = multi.ACI;
const bytecode = multi.byte_code;
const contract_address = 'ct_EGRLckAmGS1eF7yC2JssQwq4v5RVkjzHQ5gfvAcFomqYYPu1i';

const node = new Node('https://testnet.aeternity.io');

//authorize(nonce : int) // int input
const Card1 = () => {
  const [inputValue, setInputValue] = useState('');

  const { address } = useContext(WalletContext);
  // console.log('Wallet address received:', address); // Log received address

  // const sender_address = address;

  // const aeSdk = new AeSdk({
  //   nodes: [{ name: 'testnet', instance: node }],
  //   compilerUrl: 'https://compiler.aepps.com', // Consider removing if not needed
  // });

  // console.log('AeSdk instance created:', aeSdk); // Log SDK instance

  // aeSdk.addAccount(sender_address, { select: true });

  // const contract = aeSdk.getContractInstance({ aci, contract_address });

  // console.log('Contract instance retrieved:', contract); // Log contract instance




  // error is coming here when Aesdk is initialized and aeSdk.getContractInstance is called
  //the error which is coming is Cannot read properties of undefined (reading 'split') from AeSdk
  // thats why for now i have commented the code and used null for contract
  //As due to lack of proper documentation i am not able to figure out the exact problem
  //refered to the documentation from https://docs.aeternity.com/aepp-sdk-js/v12.1.2/guides/contracts/
  const contract = null;

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputValue) {
      console.error("Please enter a nonce value.");
      return;
    }

    const options = {
      amount: "0", // Set amount to zero
      callData: "", // Assuming no additional call data
      fee: null, // Set fee dynamically if needed
      gas: null, // Set gas dynamically if needed
      gasPrice: 1000000000, // Adjust gas price as needed
    };

    const args = [parseInt(inputValue, 10)]; // Convert nonce to integer and put in array

    try {
      const result = await contract.methods.authorize(args, options);

      console.log("Transaction submitted:", result.txHash);

      console.log("Transaction result:", await result.wait());

      // Handle successful authorization (if applicable)

    } catch (error) {
      console.error("Error calling authorize:", error);
      // Handle errors appropriately
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Authorize</h2>      
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Nonce (int): *
          <input
            type="number"
            placeholder="Enter a nonce value"
            value={inputValue}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

//propose(tx_hash : hash, ttl : Chain.ttl) // hash input
const Card2 = () => {
  const [hashValue, setHashValue] = useState('');
  const [chainValue, setChainValue] = useState('');

  const handleHashChange = (e) => {
    setHashValue(e.target.value);
  };

  const handleChainChange = (e) => {
    setChainValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hashValue && chainValue) {
      console.log('Hash Input:', hashValue);
      console.log('Chain Input:', chainValue);
      setHashValue('');
      setChainValue('');
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Propose</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Input Hash Value: *
          <input
            type="input"
            placeholder="Hash"
            value={hashValue}
            onChange={handleHashChange}
          />
        </label>
        <label>
          Input Chain: *
          <input
            type="text"
            placeholder="Chain"
            value={chainValue}
            onChange={handleChainChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

//confirm(tx_hash : hash) // hash input => string ig

const Card3 = () => {
  const [conHash, setConHash] = useState('');

  const handleConHash = (e) => {
    setConHash(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (conHash) {
      console.log('Confirmed Proposal', conHash);
      setConHash('');
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Confirm Proposal</h2>      
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Proposal Hash: *
          <input
            type="input"
            placeholder="Enter Proposal Hash"
            value={conHash}
            onChange={handleConHash}
            required
          />
        </label>
        <button type="submit">Confirm</button>
      </form>
    </div>
  );
};

//refuse(tx_hash: hash) // hash
const Card4 = () => {
  const [refuseHash, setRefuseHash] = useState('');

  const handleRefuseHash = (e) => {
    setRefuseHash(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (refuseHash) {
      console.log('Refused Proposal: ', refuseHash);
      setRefuseHash('');
    } 
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Refuse Proposal</h2>      
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Proposal Hash: *
          <input
            type="input"
            placeholder="Enter Proposal Hash"
            value={refuseHash}
            onChange={handleRefuseHash}
            required
          />
        </label>
        <button type="submit">Confirm</button>
      </form>
    </div>
  );
};

//revoke(tx_hash : hash) // hash 
const Card5 = () => {
  const [revokeHash, setRevokeHash] = useState('');

  const handleRevokeHash = (e) => {
    setRevokeHash(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (revokeHash) {
      console.log('Sign revoked for Proposal', revokeHash);
      setRevokeHash('');
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Proposal Sign Revoke</h2>      
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Proposal Hash: *
          <input
            type="input"
            placeholder="Enter Proposal Hash"
            value={revokeHash}
            onChange={handleRevokeHash}
            required
          />
        </label>
        <button type="submit">Confirm</button>
      </form>
    </div>
  );
};

//lend(amount : int, borrower : address) // int , address(string)
const Card6 = () => {
  const [lendAmtValue, setLendAmtValue] = useState('');
  const [address, setAddress] = useState('');

  const handleLendAmtChange = (e) => {
    setLendAmtValue(e.target.value);
  };

  const handleAddressChnage = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (lendAmtValue && address) {
      console.log(address , ' has been lent ' , lendAmtValue , ' AE');
      setLendAmtValue('');
      setAddress('');
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Lend AE</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Lend amount (AE): *
          <input
            type="input"
            placeholder="Enter Lend Amount"
            value={lendAmtValue}
            onChange={handleLendAmtChange}
            required
          />
        </label>
          <label>
            Borrower Address: *
            <input
              type="input"
              placeholder="Enter Borrower Address"
              value={address}
              onChange={handleAddressChnage}
              required
            />
          </label>
          <button type="submit">Lend AE</button>
        </form>
    </div>
  );
};

//repay(amount : int) // int 
const Card7 = () => {
  const [repayAmtValue, setRepayAmtValue] = useState('');

  const handleRepayAmtChange = (e) => {
    setRepayAmtValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (repayAmtValue) {
      console.log('Repaying: ', repayAmtValue , ' AE');
      setRepayAmtValue('');
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Repay AE</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Repay amount (AE): *
          <input
            type="input"
            placeholder="Enter Repay Amount"
            value={repayAmtValue}
            onChange={handleRepayAmtChange}
            required
          />
        </label>
        <button type="submit">Repay AE</button>
      </form>
    </div>
  );
};

const User = () => {
  //const [isLoading, setIsLoading] = useState(false);
  //const navigate = useNavigate();

  // State for the input fields
  //const [input1, setInput1] = useState('');
  //const [input2, setInput2] = useState('');

  // Handler for the button click
  //const handleButtonClick = () => {
    // Your logic here
  //};

  return (
    <div>
      <Header/>
      <div className="app-header">
         <h2>CRX- Money Lending</h2>
      </div>

      <div className="app">
        <Card1 />
        <Card2 />
        <Card3 />
        <Card4 />
        <Card5 />
        <Card6 />
        <Card7 />
      </div>

      <footer>
        <p>© 2024 Crx Moneylending</p>
        <p>Disclaimer: This project is made for desmonstration purpose only.
          <br />Neither Developer nor Contributers are responsible for any loss.
        </p>
      </footer>
    </div>
    
  );
};

export default User;
