import React from "react";
import { Link } from "react-router-dom";
export default function Register() {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center">
        <div className="w-[90%] md:w-1/2 mt-12">
          <img src="./role.png" alt="Role" />
        </div>
        <div className="flex flex-col justify-center items-center mt-32">
          <div>
            <p className="font-bold text-4xl">Select your role</p>
          </div>
          <div className="flex justify-between gap-5 mt-5">
            <Link to="/enterprise">
              <button className="rounded-full p-3 w-32 outline outline-offset-2 outline-green-500 outline-1 hover:outline-2 hover:bg-green-200">
                Enterprise
              </button>
            </Link>
            <Link to="/recipient">
              <button className="rounded-full p-3 w-32 outline outline-offset-2 outline-green-500 outline-1 hover:outline-2 hover:bg-green-200">
                Recipient
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
