import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import {ethers} from "ethers";
import BitLogixABI from "../ABI/BitLogix.json";
import { Signer } from "@ethersproject/abstract-signer";

export default function Recipient() {
  const [isloading, setIsLoading] = useState(false);
  const url = process.env.REACT_APP_BACKEND_URL
  const [recipients, setRecipients] = useState("");
/*
    const [formd,setFormd] = useState({
      type:"recipient",
      name:"",
      place:"",
      govtid:"",
    })*/
    
    const [fullName, setFullName] = useState();
  const [detail, setDetails] = useState();
  const [id, setID] = useState();
  const { account } = useWeb3React();
    async function registerRecipient(){
      try{
        if(!account){
          console.error("No connected Ethereum account");
          return;
        }
        setIsLoading(true);
        const bitLogixContractAddress="0x6fa424C2379E7b86d039562dA5E8b6E25dcc4af5";
        //const provider = new ethers.BrowserProvider(window.ethereum);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const bitLogixContract = new ethers.Contract(
          bitLogixContractAddress,
          BitLogixABI,
          signer
        );
        console.log("Is it working?");
        const tx = await bitLogixContract.registerRecipient(

          fullName,
          detail,
          id
        );
        console.log("Is it working?");
        await tx.wait();
        console.log("Is it working?");
        await fetch(`${url}/api/v1/user`, {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            type:"recipient",
            name: fullName,
            place: detail,
            govtid: id,
          }),
        }).then((res) => {
          console.log(res);
          setIsLoading(false);
          // navigate("/success")
        });

       
       
        
        console.log("Registration Successful");

      }catch(error){
        console.error("Error:", error);
      setIsLoading(false);
      }
    }

   

    
    
  return (
    <>
      <div className="flex flex-wrap justify-evenly items-center min-h-[100vh]">
        <img
          src="../recipient-home.avif"
          alt="img-vect"
          className="lg:w-[35rem] lg:h-[35rem]"
        />
        <div
          className="px-5 flex items-center justify-center"
          style={{ width: "30rem" }}
        >
          <div className="w-full h-100">
            
            <div>
              <span className="relative mt-6 md:mt-0 bottom-5 lg:bottom-20 font-Pantel text-4xl text-indigo-500 tracking-wider font-medium underline block text-center">RECIPIENT</span>
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                id =""
                placeholder="Enter Full Name"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                onChange={(e)=> setFullName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Place of Business</label>
              <input
                type="text"
                name="place"
                id =""
                placeholder="Enter the place of your business"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                onChange={(e)=> setDetails(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Govt Authorized ID</label>
              <input
                type="text"
                name="govtid"
                id = ""
                placeholder="Enter Govt Authorized ID number"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                onChange={(e)=> setID(e.target.value)}
                required
              />
            </div>
            {isloading ? (
              <>
                <button
                  disabled
                  className="cursor-progress w-full block bg-gray-500  text-white font-semibold rounded-lg
                  px-4 py-3 mt-6"
                >
                  Creating Account
                </button>
              </>
            ) : (
              <>
                <button
                  // type="submit"
                  className="w-full block bg-indigo-500 hover:bg-indigo-400  text-white font-semibold rounded-lg
                  px-4 py-3 mt-6"
                  onClick={registerRecipient}
                >
                  Create Account
                </button>
              </>
            )}
            
          </div>
        </div>
      </div>
    </>
  );
}
