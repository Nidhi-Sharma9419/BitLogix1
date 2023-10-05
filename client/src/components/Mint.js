import axios from 'axios';
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EnterpriseNavbar from "./EnterpriseNavbar";
import { useWeb3React } from "@web3-react/core";
import { ethers } from 'ethers';
import contractABI from '../ABI/BitLogixNFT.json';
import {create} from 'ipfs-http-client';
import { BigNumber} from "@ethersproject/bignumber";
var Buffer = require('buffer/').Buffer;

const projectId = '2985420746e8ba454e98';
const projectSecret = '1b4b8765cc741c60b66d93e7f5c39ec54bbde638530f4b3366ef13ada818ddd8';
const CID = 'QmPE9XtFDidyRAR9GijkKKTh5A8aroun3BvoLDqs7df44o';
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');



export default function Mint() {
  const { account } = useWeb3React();
  const navigate = useNavigate();
  const url = process.env.REACT_APP_BACKEND_URL;
  const { recaddress } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isloading,setIsloading] = useState(false);
  const [nftMetadata, setNftMetadata] = useState(null);
  const [fileImg, setFileImg] = useState(null);
  const provider = new ethers.BrowserProvider(window.ethereum);
  
  const contractAddress="0xe278a23290e12ba8c19ba706240d795dbf49303b";
  const signer = provider.getSigner();
  const nftContract = new ethers.Contract(contractAddress, contractABI, provider);

  



  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Create a URL for the selected image and set it in state
      const imageUrl = URL.createObjectURL(file);
      setSelectedFile(imageUrl);
    }
  };

  const handleUpload = async () => {
    try {
      if (selectedFile) {
       
        const ipfsURI = await uploadToIPFS(selectedFile);

       
        const tx = await nftContract.setBaseURI(ipfsURI);
        await tx.wait();

        
        const tokenId = '1'; 
        const tokenMetadataURI = await nftContract.tokenURI(tokenId);
        const response = await fetch(tokenMetadataURI);
        if (response.ok) {
          const metadata = await response.json();
          setNftMetadata(metadata);
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    setIsloading(true);
    
    try {
      const ipfsURI = 'https://ipfs.io/ipfs/QmPE9XtFDidyRAR9GijkKKTh5A8aroun3BvoLDqs7df44o/';
      const recipientAddress = recaddress;

      await nftContract.mintNFT(recipientAddress, ipfsURI);

      setIsloading(false);
      navigate('/qualityenterprise');
    } catch (error) {
      console.error(error);
      setIsloading(false);
    }

   
    await fetch(`${url}/api/v1/reward`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        enterpriseaddress:account,
        recipientaddress:recaddress
      }),
    }).then((res) => {
      setIsloading(false);
      navigate("/qualityenterprise");
    });
  }

  const handleMint = async () => {
    try {
      const recipientAddress = recaddress;
      const ipfsURI = nftMetadata ? nftMetadata.image : "";

      await nftContract.mintNFT(recipientAddress, ipfsURI);

      setIsloading(false);
      navigate("/qualityenterprise");
    } catch (error) {
      console.error("Error minting NFT:", error);
      setIsloading(false);
    }
  };
  const backgroundHeightClass = selectedFile ? "h-full" : "h-screen";
  

  useEffect(() => {
    async function loadNftMetadata() {
      try {
        if (selectedFile) {
          const tokenId = BigNumber.from('QmPE9XtFDidyRAR9GijkKKTh5A8aroun3BvoLDqs7df44o'); //I need to replace it with the actual token ID
          const tokenMetadataURI = await nftContract.tokenURI(tokenId);
          // need to work
          // Fetch and parse the metadata from the tokenMetadataURI (e.g., from IPFS)
          const response = await fetch(tokenMetadataURI);
          if (response.ok) {
            const metadata = await response.json();
            setNftMetadata(metadata);
          }
        }
      } catch (error) {
        console.error('Error fetching token metadata:', error);
      }
    }

    loadNftMetadata();
  }, [selectedFile]); 

  /*

  const uploadToIPFS = async (file) => {
    // Create an IPFS client connected to your IPFS node
    const ipfs = ipfs({ host: 'localhost', port: 5001, protocol: 'http' }); // Replace with your IPFS node details
  
    try {
      const buffer = Buffer.from(await file.arrayBuffer());

     
      const response = await ipfs.add(buffer);

      if (response && response[0] && response[0].hash) {
       
        const ipfsURI = `https://ipfs.io/ipfs/${response[0].hash}`;

        return ipfsURI;
      } else {
        throw new Error("IPFS upload failed.");
      }
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
      throw error;
    }*/
    const uploadToIPFS = async (e) => {

      if (fileImg) {
          try {

              const formData = new FormData();
              formData.append("file", fileImg);

              const resFile = await axios({
                  method: "post",
                  url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                  data: formData,
                  headers: {
                      'pinata_api_key': `${process.env.REACT_APP_PINATA_API_KEY}`,
                      'pinata_secret_api_key': `${process.env.REACT_APP_PINATA_API_SECRET}`,
                      "Content-Type": "multipart/form-data"
                  },
              });

              const ImgHash = `https://ipfs.io/ipfs/${resFile.data.IpfsHash}`;
           console.log(ImgHash); 
//Take a look at your Pinata Pinned section, you will see a new file added to you list.   



          } catch (error) {
              console.log("Error sending File to IPFS: ")
              console.log(error)
          }
      }
  }
  

  
  
  

  return (
    <>
      <EnterpriseNavbar />
      <div className="h-auto flex flex-col justify-center items-center relative">
        <img
          src={"/mintbg.jpg"}
          alt="mint"
          className={`absolute top-0 -z-5 opacity-10 hidden lg:block h-full w-full ${backgroundHeightClass}`}
        />
        <img
          src={"/mintbgphone.jpg"}
          alt="mint"
          className={`absolute top-0 -z-5 opacity-30 md:hidden h-full w-full ${backgroundHeightClass}`}
        />
        <img
          src={"/mintbgtab.png"}
          alt="mint"
          className={`absolute top-0 -z-5 opacity-20 hidden md:block lg:hidden h-auto w-full ${backgroundHeightClass}`}
        />
        <h1 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-center text-transparent bg-clip-text text-6xl font-bold font-Pantel mt-5 z-50">
          Mint A{" "}
          <span className="relative bg-gradient-to-r from-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
            NFT
            <span className="absolute w-full h-1 bottom-0 left-0 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400"></span>
          </span>
        </h1>

        <div className="border-2 border-pink-400 rounded-lg p-2 mt-5 w-[80%] md:w-auto z-20">
          <div className="max-w-xs md:max-w-fit mx-auto">
            <span className="block text-center text-2xl">
              Recipient <u>Address</u>
            </span>
            <span className="text-center block overflow-x-auto whitespace-normal">
              {recaddress}
            </span>
          </div>
        </div>

        <div className="border-2 border-green-600 p-6 px-12 mt-5 rounded-md z-40">
          <div className="flex flex-col items-center w-full">
            <label className="w-48 flex flex-col items-center px-4 py-6 bg-white text-blue-400 rounded-lg shadow-lg tracking-wide uppercase border-2 border-blue-400 cursor-pointer hover:bg-gray-700 hover:text-white">
              <svg
                className="w-8 h-10"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span className="mt-2 text-base leading-normal">
                {selectedFile ? "Change file" : "Select a file"}
              </span>
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            {selectedFile && (
              <img
                src={selectedFile}
                alt="Preview"
                className="w-[50%] mt-3 rounded-md"
              />
            )}
            <button 
            onClick={handleUpload}
             className="bg-blue-600 p-2 rounded-2xl hover:bg-blue-400 text-2xl rounded-lg hover:text-white font-semibold mt-2">
              Upload
            </button>
          </div>
        </div>
        <div className="flex flex-row mt-6 space-x-11 z-30">
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-3 rounded-lg">
            <button className="text-2xl rounded-lg font-semibold hover:text-white">
              Mint
            </button>
          </div>
          <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% p-3 rounded-lg">
            {isloading ?(<>
              <button disabled className="cursor-progress text-2xl rounded-lg font-semibold hover:text-white" onClick={handleTransfer}>
              Transfer
            </button>
            </>):(<>
              <button className="text-2xl rounded-lg font-semibold hover:text-white" onClick={handleTransfer}>
              Transfer
            </button>
            </>)}
          </div>
        </div>
        {selectedFile && nftMetadata && (
          <div className="border-2 border-blue-400 rounded-lg p-2 mt-5 w-[80%] md:w-auto z-20">
            <div className="max-w-xs md:max-w-fit mx-auto">
              <span className="block text-center text-2xl">
                NFT Metadata
              </span>
              <pre className="text-center block overflow-x-auto whitespace-normal">
                {JSON.stringify(nftMetadata, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
