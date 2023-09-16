import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Make sure to import Switch
import ConnectWallet from './components/ConnectWallet';
import Recipient from './components/Recipient';
import SelectRole from './components/SelectRole';
import Delivery from './components/Delivery';
import Enterprise from './components/Enterprise';
import ProductDetails from './components/ProductDetails';
import AddDelivery from './components/AddDelivery';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ConnectWallet/>} />
        <Route path="/SelectRole" element={<SelectRole/>}/>
        <Route path="/recipient" element={<Recipient />} />
        <Route path='/delivery' element={<Delivery />} />
        <Route path="/enterprise" element={<Enterprise />} />
        <Route path="/addproduct" element={<ProductDetails />} />
        <Route path="/adddelivery" element={<AddDelivery />} />
      </Routes>
    </Router>
  );
}

export default App;

