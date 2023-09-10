



import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Make sure to import Switch



import ConnectWallet from './components/ConnectWallet';
import SelectRole from './components/SelectRole';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ConnectWallet/>} />
        <Route path="/SelectRole" element={<SelectRole/>}/>
      </Routes>
    </Router>
  );
}

export default App;

