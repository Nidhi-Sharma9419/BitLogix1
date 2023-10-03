import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EnterpriseNavbar from "./EnterpriseNavbar";
import { useWeb3React } from "@web3-react/core";

export default function Mint() {
  const { account } = useWeb3React();
  const navigate = useNavigate();
  const url = process.env.REACT_APP_BACKEND_URL;
  const { recaddress } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);
  const [islaoding,setIsloading] = useState(false)
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Create a URL for the selected image and set it in state
      const imageUrl = URL.createObjectURL(file);
      setSelectedFile(imageUrl);
    }
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    setIsloading(true);
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
  const backgroundHeightClass = selectedFile ? "h-full" : "h-screen";

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
            <button className="bg-blue-600 p-2 rounded-2xl hover:bg-blue-400 text-2xl rounded-lg hover:text-white font-semibold mt-2">
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
            {islaoding ?(<>
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
      </div>
    </>
  );
}
