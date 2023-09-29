import React, { useState } from "react";
import EnterpriseNavbar from "./EnterpriseNavbar";

export default function EnterpriseClaim() {
  const [isClaimed, setIsClaimed] = useState(false);
  const [randomNumber, setRandomNumber] = useState(0);

  const handleClaim = () => {
    // Generate a random number between 1.0 and 10.0 with 0.1 precision
    const newRandomNumber = ((Math.random() * 90 + 10) / 10).toFixed(1);
    
    // Update state to show the claimed content
    setRandomNumber(newRandomNumber);
    setIsClaimed(true);
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
              You earned {randomNumber} BTT from our token Box.
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
