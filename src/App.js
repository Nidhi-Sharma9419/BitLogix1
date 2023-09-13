import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Make sure to import Switch
import ConnectWallet from './components/ConnectWallet';
import Recipient from './components/Recipient';
import SelectRole from './components/SelectRole';
import Delivery from './components/Delivery';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ConnectWallet/>} />
        <Route path="/SelectRole" element={<SelectRole/>}/>
        <Route path="/recipient" element={<Recipient />} />
        <Route path='/delivery' element={<Delivery />} />
      </Routes>
    </Router>
  );
}

export default App;

