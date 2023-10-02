import './App.css';
import  React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Make sure to import Switch
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Recipient from './components/Recipient';
import Enterprise from './components/Enterprise';
import ProductDetails from './components/ProductDetails';
import SelectRole from "./components/SelectRole";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from './components/Navbar';
import EnterpriseProductPage from './components/EnterpriseProductPage';
import ProductCardEnt from './components/ProductCardEnt';
import Team from './components/Team';
import RecipientProductPage from './components/RecipientProductPage';
import ProductCardRec from './components/ProductCardRec';
import CheckBalanceEnt from './components/CheckBalanceEnt';
import CheckBalanceRec from './components/CheckBalanceRec';
import QualityEnt from './components/QualityEnt';
import Mint from './components/Mint';
import EnterpriseClaim from './components/EnterPriseClaim';
import RecipientClaim from './components/RecipientClaim';
import QualityRec from './components/QualityRec';


function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path= "/about" element={<AboutUs />} ></Route>
        <Route path="/team" element={<Team />} />
        <Route path="/select" element={<SelectRole/>}></Route>
        <Route path="/recipient" element={<Recipient />} />
        <Route path="/enterprise" element={<Enterprise />} />
        <Route path="/addproduct" element={<ProductDetails />} />
        <Route path='/products' element={<EnterpriseProductPage />} />
        <Route path="/product/:id" element={<ProductCardEnt />} />
        <Route path='/deliveries' element={<RecipientProductPage />} />
        <Route path="/delivery/:id" element={<ProductCardRec />} />
        <Route path='/checkenterprise' element={<CheckBalanceEnt />} />
        <Route path='/checkrecipient' element={<CheckBalanceRec />} />
        <Route path='/qualityenterprise' element={<QualityEnt />} />
        <Route path='/qualityrecipient' element={<QualityRec />} />
        <Route path='/mint/:recaddress' element={<Mint />} />
        <Route path='/claiment' element={<EnterpriseClaim />} />
        <Route path='/claimrec' element={<RecipientClaim />} />
      </Routes>
    </Router>
  );
}

export default App;

