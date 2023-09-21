import React, { useState } from "react";
import { Link } from "react-router-dom";
import Enterprise from "./Enterprise";
import Recipient from "./Recipient";
import Navbar from "./Navbar";

// import { Link, useNavigate } from "react-router-dom";
export default function Register() {
  //   const navigate = useNavigate();

  const [type, setType] = useState("");
  return (
    <>
    <div className="flex justify-center items-center">
      <div className="w-1/2 mt-12  -me-40 hidden lg:block">
        <img src="../reg.png" />
      </div>
      <div className="flex flex-col  justify-center items-center h-[11/12] mt-32 lg:mt-0 " >
        <div>
          <p className="font-bold text-4xl">select your role</p>
        </div>
        <div className="flex justify-between gap-5 mt-5">
          <button
            className={`${
              type == "Enterprise"
                ? "bg-green-400 text-gr font-bold outline outline-green-600"
                : "outline outline-offset-2 outline-green-500 outline-1 hover:outline-2 hover:bg-green-200"
            } rounded-full p-3 w-32 `}
            onClick={() => setType("Enterprise")}
          >
            Enterprise
          </button>
          <button
            className={`${
              type == "Recipient"
                ? "bg-green-400 text-gr font-bold outline outline-green-600"
                : "outline outline-offset-2 outline-green-500 outline-1 hover:outline-2 hover:bg-green-200"
            } rounded-full p-3 w-32 `}
            onClick={() => setType("Recipient")}
          >
            Recipient
          </button>
        </div>
        <div>
          {type ? (
            <>
              {type == "Enterprise" ? (
                <>
                 <Link to="/enterprise"></Link>
                </>
              ) : (
                <>
                  <div>
                  <Link to="/recipient"></Link>
                  </div>
                </>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
    </>
  );
}