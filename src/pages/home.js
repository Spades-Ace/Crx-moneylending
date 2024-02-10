import React, { useState, useEffect, useContext  } from 'react';
import { motion } from 'framer-motion';
import "./styles/home.css"; 
import Footer from './components/footer';
import { useNavigate } from 'react-router-dom';

import Header from './components/header'; // Import the Header component
import useAeternitySDK from './../hooks/useAeternitySDK';

import WalletContext from './WalletContext'; // Import WalletContext
import { AE_AMOUNT_FORMATS } from '@aeternity/aepp-sdk';

const Home = () => {
    const [cloudVisible, setCloudVisible] = useState(false); // cloud animation
    const showCloud = () => {
        setCloudVisible(true);
    };
  
    const hideCloud = () => {
        setCloudVisible(false);
    };

		const { aeSdk, connectToWallet, address, getBalance } = useAeternitySDK(); // Get the connectToWallet function from the hook
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

		const {setAddress, setBalance } = useContext(WalletContext);
		

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const balance = await aeSdk.getBalance(address, { format: AE_AMOUNT_FORMATS.AE });
        setBalance(balance);
				navigate('/user');
      } catch (error) {
        console.error(error.message);
      }
    };

    if (address) {
			setAddress(address);
      fetchBalance();
    }
  }, );
		
		const handleConnectClick = async () => {
			setIsLoading(true);
			try {
					await connectToWallet(); // Call connectToWallet function to connect
					// await address;
					// setAddress(address);
					// const balance = await aeSdk.getBalance(address, { format: AE_AMOUNT_FORMATS.AE });
        	// setBalance(balance);
					// if (address && balance)
					// {navigate('/user');}
					
			} catch (error) {
					console.error(error.message);
			} finally {
					setIsLoading(false);
			}
	};
	

    return (
        <div className="trinity-home">
            <Header /> {/* Include the Header component */}
            <div className="getStarted">
                <div className="home-info">
                    <p className="alpha">⚠ Alpha Stage</p>
                    <br />
                    <h3 className="presenting">Chain Reactors presents</h3>
                    <section className="logo">
                        <h1 className="brand trinity-effect">
                            TRINITY
                        </h1>
                        <p className='version'>v0.1.0</p>
                    </section>

                    <br />
                    <h4 className="tagline">Connect your Wallet to start your experience!</h4>
                    <br />
                    <a href="#"  className="connect-btn" onMouseEnter={showCloud} onMouseLeave={hideCloud} onClick={handleConnectClick}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Connect Wallet ➤
                    </a>
                    <motion.div
                        className="cloud-instructions"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: cloudVisible ? 1 : 0, scale: cloudVisible ? 1 : 0 }}
                        transition={{ duration: 4, ease: "easeInOut" }}
                    >
                        {cloudVisible && (
                            <>
                                <p>Click to connect your wallet</p>
                                <p>Follow the instructions in SuperHero</p>
                            </>
                        )}
                    </motion.div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Home;
