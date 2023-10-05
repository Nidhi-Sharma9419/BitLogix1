import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import EnterpriseNavbar from './EnterpriseNavbar';
import BitLogixABI from '../ABI/BitLogix.json';
import { useWeb3React } from '@web3-react/core';

const contractAddress = '0x6fa424C2379E7b86d039562dA5E8b6E25dcc4af5';

export default function EnterpriseClaim() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [isClaimed, setIsClaimed] = useState(false);
  const [claimedAmount, setClaimedAmount] = useState(0); 
  const {account} = useWeb3React();
  

  

  useEffect(() => {
    async function initEthers() {
      if (account) {
        try {
          
          const providerInstance = new ethers.BrowserProvider(window.ethereum);
          setProvider(providerInstance);

        
          const signer = await provider.getSigner();
          const contractInstance = new ethers.Contract(contractAddress, BitLogixABI, signer);
          setContract(contractInstance);
        } catch (error) {
          console.error(error);
        }
      }
    }

    initEthers();
  }, [account]);

  
  const handleClaim = async () => {
    if (contract && provider) {
      try {
        const signer = await provider.getSigner();
        const senderAddress = await signer.address;

        
        await contract.claimTokens({ gasLimit: 2000000, gasPrice: ethers.parseUnits('2000000', 'gwei') });

        
        const claimedTokenAmount = await contract.getContractBalance(); 

        
        setClaimedAmount(claimedTokenAmount.toString());
        console.log("tell me");
        setIsClaimed(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <EnterpriseNavbar />
      <div className="flex flex-col mt-9 border-2 border-slate-500 justify-center lg:w-[60%] mx-auto p-6 rounded-lg">
        <span className="font-mono font-semibold text-2xl block text-center">
          WELCOME TO <br />
          <u className="text-gray-700 font-bold text-4xl">BitLogiX</u>
        </span>
        {isClaimed ? (
          <>
            <img src={"/gift.svg"} alt="Gift" className="w-96 mx-auto" />
            <span className="text-green-500 font-Pantel font-medium text-2xl text-center mt-5">
              You earned {claimedAmount} BTT from our token Box.
            </span>
          </>
        ) : (
          <>
            <span className="text-gray-700 font-Pantel text-2xl text-center mt-5">
              As a form of Thank you for joining our Supply Chain dApp EcoSystem,
              <br />
              We are offering a one-time Bonus exclusively to you
            </span>
            <span className="text-gray-700 font-Pantel text-2xl text-center mt-5">
              Claim it by clicking on the button below !!
            </span>
            <button
              onClick={handleClaim}
              className="bg-blue-600 p-4 w-fit self-center mt-16 rounded-2xl text-2xl font-semibold hover:text-white hover:bg-blue-400"
            >
              Claim
            </button>
          </>
        )}
      </div>
    </>
  );
}
