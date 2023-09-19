import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';

const injectedConnector = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 11155111, 80001],
});

export default function Navbar() {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState('');
  const { activate, deactivate, active, account } = useWeb3React();

  useEffect(() => {
    if (account) {
      console.log('Account', account);
      setAddress(account);
    }
  }, [account]);

  const connectOrDisconnectWallet = async () => {
    console.log('Connecting or disconnecting wallet...');
    try {
      if (connected) {
        await deactivate();
        console.log('Wallet disconnected');
        setConnected(false);
      } else {
        await activate(injectedConnector);
        console.log('Wallet connected');
        console.log('Account', account);
        setConnected(true);
      }
    } catch (error) {
      console.error('Failed to connect or disconnect', error);
    }
  };

  const handleMouseEnter = () => {
    if (connected) {
      // Show the overlay box when hovering over the "Disconnect Wallet" button
      const overlayBox = document.getElementById('wallet-overlay-box');
      if (overlayBox) {
        overlayBox.style.display = 'block';
      }
    }
  };

  const handleMouseLeave = () => {
    // Hide the overlay box when moving the mouse out
    const overlayBox = document.getElementById('wallet-overlay-box');
    if (overlayBox) {
      overlayBox.style.display = 'none';
    }
  };

  return (
    <div className="bg-slate-600 flex w-full h-[50px] sticky top-0 rounded-b-2xl">
      <img src={"/bitlogixlogo-transparent.png"} alt="" className="w-[10%] rounded-b-2xl" />
      <nav className="w-full flex justify-between md:ml-5">
        <Link
          to="/"
          className="rounded-lg m-1 p-1 h-[40px] md:h-auto md:p-2 text-center bg-slate-500 hover:bg-slate-400 text-white"
        >
          Home
        </Link>
        <Link
          to="/aboutus"
          className="rounded-lg m-1 p-1 h-[40px] md:h-auto md:p-2 text-center bg-slate-500 hover:bg-slate-400 text-white"
        >
          About
        </Link>
        <button
          onClick={connectOrDisconnectWallet}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`border-2 border-green-400 bg-green-700 hover:bg-green-500 p-2 rounded-3xl m-1 hover:text-white ${
            connected ? 'bg-red-700 hover:bg-red-500' : ''
          }`}
        >
          {connected ? 'Disconnect Wallet' : 'Connect Wallet'}
          {connected && (
            <div
              id="wallet-overlay-box"
              className="absolute bg-white border border-gray-300 p-2 rounded-md shadow-md text-black"
              style={{ display: 'none', top: '100%', left: '50%', transform: 'translateX(-50%)' }}
            >
              {address}
            </div>
          )}
        </button>
      </nav>
    </div>
  );
}
