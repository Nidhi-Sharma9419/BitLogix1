import React, { useState } from "react";

export default function Recipient() {
  const [isloading, setIsLoading] = useState(false);
  return (
    <>
      <div className="flex flex-wrap justify-evenly items-center min-h-[100vh]">
        <img
          src="../recipient-home.avif"
          alt="img-vect"
          className="w-[35rem] h-[35rem]"
        />
        <div
          className="px-5 flex items-center justify-center"
          style={{ width: "30rem" }}
        >
          <div className="w-full h-100">
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                id=""
                placeholder="Enter Full Name"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Place of Business</label>
              <input
                type="text"
                name="name"
                id=""
                placeholder="Enter the place of your business"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
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
                  type="submit"
                  className="w-full block bg-indigo-500 hover:bg-indigo-400  text-white font-semibold rounded-lg
                  px-4 py-3 mt-6"
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
