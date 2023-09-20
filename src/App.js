import './App.css';
import  React,{ useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Make sure to import Switch
import { InjectedConnector } from '@web3-react/injected-connector';
import { useWeb3React } from '@web3-react/core';
import { Box, Typography } from '@mui/material';
import { Button } from '@mui/base';
import Home from './Home';
import AboutUs from './AboutUs';
import Recipient from './components/Recipient';
import SelectRole from './SelectRole';
import Delivery from './components/Delivery';
import Entity from './components/Entity';
import ProductDetails from './components/ProductDetails';
import AddDelivery from './components/AddDelivery';
import "react-datepicker/dist/react-datepicker.css";

//import BitLogixABI from './artifacts/contracts/BitLogix.json';


const injectedConnector = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 11155111, 80001],
});


const ContractAddress="0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e";


function App() {
  const[connected, setConnected] = useState(false);
  const[address, setAddress] = useState("");
  const{activate, active, account} = useWeb3React();

  useEffect(()=>{
    if(account){
      console.log("Account", account);
      setAddress(account);
      

    }
  }, [account]);

  const connectWallet = async() => {
    console.log("Connecing to wallet...");
    try{
      await activate(injectedConnector);
      console.log("wallet connected");
      console.log("Account",account);
      setConnected(true);
    
    }catch(error){
      console.error("Failed to connect", error);
    }
  };





 

  




  return (
    <Router>
      <nav style={{ margin: 10 }}>
          <Link to="/Home" style={{ padding: 5 }}>
          Home
          </Link>
          <Link to="/aboutus" style={{ padding: 5 }}>
          About
          </Link>
          <button
          onClick={connectWallet}>
            Connect Wallet
          </button>
          <p>{address}</p>
      </nav>

      <Routes>
        <Route path="/Home" element={<Home />}></Route>
        <Route path= "/aboutus" element={<AboutUs />} ></Route>
        
        <Route path="/recipient" element={<Recipient />} />
        <Route path='/delivery' element={<Delivery />} />
        <Route path="/enterprise" element={<Entity />} />
        <Route path="/addproduct" element={<ProductDetails />} />
        <Route path="/adddelivery" element={<AddDelivery />} />
      </Routes>
    </Router>
  );
}

export default App;

