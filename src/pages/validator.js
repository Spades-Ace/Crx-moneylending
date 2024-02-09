import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import ConnectWallet from "../pages/wallet";
import "./styles/validator.css";

import withPermission from "../pages/withPermission";

function Validator(props) { 
  const location = useLocation();
  const token = location.state && location.state.token;

  //console.log("Token in Validator page:", token); // Log the token to the console
  return (
    <div className="validator-page">
      <Header />
      <ConnectWallet />
      <h1>Validator Page</h1>

      <div className = "ineer-container">
        <div className = "row">
          <div className = "col-sm">
            <h3>Upload a File</h3>
            <button type="button" className="contButton"> ➤ </button>
          </div>
          <div className = "col-sm">
            <h3>Validate a File</h3>
            <button type="button" className="contButton"> ➤ </button>
          </div>
          <div className = "col-sm">
            <h3>Get a File</h3>
            <button type="button" className="contButton"> ➤ </button>
          </div>
          <div className = "col-sm">
            <h3>Flag a File</h3>
            <button type="button" className="contButton"> ➤ </button>
          </div>
          <div className = "col-sm">
            <h3>Report a File</h3>
            <button type="button" className="contButton"> ➤ </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    
  );
}


export default withPermission(Validator, "validator");