

import React, { useState } from 'react';

import Web3Modal from 'web3modal';
import { ethers } from "ethers";
//import { Web3Provider } from 'ethers';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
//import { Web3Provider } from '@ethersproject/providers';




//const ethersProviders = ethers.providers;
//const provider = new ethers.providers.JsonRpcProvider('https://example-rpc-provider.com');
//import { EthereumProvider } from '@walletconnect/ethereum-provider'



export default function ConnectWallet (){
    


    //const [BrowserProvider, setWeb3Provider] = useState(null);
    const [Web3Provider, setWeb3Provider] = useState(null)
    
    const providerOptions = {
        coinbasewallet:{
            package: CoinbaseWalletSDK,
            options:{
                appName: 'Web3Modal Demo',
                infuraId: {1: 'https://mainnet.infura.io/v3/9aa8dd8ca6ea43058bfd66e6980ef75b'}
            }
        }
    }    

async function connectWallet(){
   
    try {
        let web3Modal = new Web3Modal( {
        cacheProvider: false,
        providerOptions,
    });
    const web3ModalInstance = await web3Modal.connect();
    const web3ModalProvider = new ethers.BrowserProvider(web3ModalInstance);
    if(web3ModalProvider){
        setWeb3Provider(web3ModalProvider);
    }
    console.log(web3ModalProvider);
    } catch (error) { 

    console.error(error);

    }
}

return (

    
    <div className='App-header'>
        <h1>CONNECT YOUR WALLET</h1>
                
        {
        Web3Provider== null?
        (
            <button onClick={connectWallet}>
                    Connect Wallet
                </button>
        ):(
            <div>
            <p>Connected!!!</p>
            <p>{setWeb3Provider.provider}</p>    
            </div>
        )
        }        
    </div>
    
)
}