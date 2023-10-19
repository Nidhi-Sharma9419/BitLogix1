import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useWeb3React } from "@web3-react/core";
import { BrowserProvider, ethers } from "ethers";
import BitLogixABI from "../ABI/BitLogix.json";
//import provider from './ethers';

//const provider = new ethers.BrowserProvider(rpcEndpoint, { chainId });

export default function Enterprise() {
  const navigate = useNavigate();
  const url = process.env.REACT_APP_BACKEND_URL;
  const [isloading, setIsLoading] = useState(false);

  const [fullName, setFullName] = useState();
  const [detail, setDetails] = useState();
  const [email,setEmail] = useState();
  const [id, setID] = useState();
  const { account } = useWeb3React();
  async function registerEnterprise(e) {
    e.preventDefault();
    try {
      if (!account) {
        console.error("No connected Ethereum account");
        return;
      }

      setIsLoading(true);
      console.log("it is working");

      const bitLogixContractAddress =
        "0x6fa424C2379E7b86d039562dA5E8b6E25dcc4af5";
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const bitLogixContract = new ethers.Contract(
        bitLogixContractAddress,
        BitLogixABI,
        signer
      );
      console.log("it is working!!!!");
      const tx = await bitLogixContract.registerEnterprise(
        fullName,
        detail,
        id
      );
      console.log("it is working!!!!!!!");
      await tx.wait(); // Wait for the transaction to be mined
      await fetch(`${url}/api/v1/user`, {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          address: account,
          type: "enterprise",
          name: fullName,
          place: detail,
          govtid: id,
          email:email
        }),
      }).then((res) => {
        navigate("/claiment");
        // console.log(res);
        setIsLoading(false);
      });
      setIsLoading(false); // Set loading state to false after the transaction

      console.log("Registration successful!");
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false); // Set loading state to false in case of an error
    }
  }

  

  return (
    <>
      <div className="flex flex-row-reverse flex-wrap justify-evenly items-center min-h-[100vh]">
        <img
          src="/enterprise.png"
          alt="img-vect"
          className="lg:w-[35rem] lg:h-[35rem] lg:mb-24"
        />
        <div
          className="px-5 flex items-center justify-center"
          style={{ width: "30rem" }}
        >
          <form onSubmit={registerEnterprise} className="w-full h-100">
            <div>
              <span className="relative mt-6 lg:bottom-20 font-Pantel text-4xl text-[#39FF14] tracking-wider font-medium underline block text-center">
                ENTERPRISE
              </span>
              <label className="block text-gray-700 mt-10">Full Name</label>
              <input
                type="text"
                name="name"
                id=""
                placeholder="Enter Full Name"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Details of Business</label>
              <input
                type="text"
                name="name"
                id=""
                placeholder="Enter the Details of your business"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                onChange={(e) => setDetails(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Govt Authorized ID</label>
              <input
                type="text"
                name="name"
                id=""
                placeholder="Enter Govt Authorized ID number"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                onChange={(e) => setID(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Email address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {isloading ? (
              <>
                <button
                  disabled
                  type="submit"
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
                  className="w-full block bg-green-500 hover:bg-green-400  text-white font-semibold rounded-lg
                    px-4 py-3 mt-6"
                  // onClick={registerEnterprise}
                >
                  Create Account
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

// import React,{useState} from 'react'

// export default function Enterprise() {
//     const [isloading, setIsLoading] = useState(false);
//     const url = "http://localhost:5000/api/v1/user"
//     const [formd,setFormd] = useState({
//       type:"enterprise",
//       name:"",
//       place:"",
//       govtid:"",
//     })
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       setIsLoading(true);
//       await fetch(`${url}`, {
//         method: "POST",
//         crossDomain: true,
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           "Access-Control-Allow-Origin": "*",
//         },
//         body: JSON.stringify(formd),
//       }).then((res) => {
//         console.log(res);
//         setIsLoading(false);
//         // navigate("/success")
//       });
//     }
//     const handleform = (e) => {
//       setFormd({
//         ...formd,
//         [e.target.name] : e.target.value,
//       });
//     };
//     return (
//       <>
//         <div className="flex flex-row-reverse flex-wrap justify-evenly items-center min-h-[100vh]">
//           <img
//             src="/enterprise.png"
//             alt="img-vect"
//             className="lg:w-[35rem] lg:h-[35rem] lg:mb-24"
//           />
//           <div
//             className="px-5 flex items-center justify-center"
//             style={{ width: "30rem" }}
//           >
//             <div className="w-full h-100">
//               <form onSubmit={handleSubmit}>
//                 <span className="relative mt-6 lg:bottom-20 font-Pantel text-4xl text-[#39FF14] tracking-wider font-medium underline block text-center">ENTERPRISE</span>
//                 <label className="block text-gray-700 mt-10">Full Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Enter Full Name"
//                   className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
//                   onChange={handleform}
//                   required
//                 />
//               <div>
//                 <label className="block text-gray-700">Details of Business</label>
//                 <input
//                   type="text"
//                   name="place"
//                   placeholder="Enter the Details of your business"
//                   className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
//                   onChange={handleform}
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700">Govt Authorized ID</label>
//                 <input
//                   type="text"
//                   name="govtid"
//                   placeholder="Enter Govt Authorized ID number"
//                   className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
//                   onChange={handleform}
//                   required
//                 />
//               </div>
//               {isloading ? (
//                 <>
//                   <button
//                     disabled
//                     type="submit"
//                     className="cursor-progress w-full block bg-gray-500  text-white font-semibold rounded-lg
//                     px-4 py-3 mt-6"
//                   >
//                     Creating Account
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <button
//                     // type="submit"
//                     className="w-full block bg-green-500 hover:bg-green-400  text-white font-semibold rounded-lg
//                     px-4 py-3 mt-6"
//                   >
//                     Create Account
//                   </button>
//                 </>
//               )}
//               </form>
//             </div>
//           </div>
//         </div>
//       </>
//     );
// }
