import React, { useState } from "react";

export default function Recipient() {
  const [isloading, setIsLoading] = useState(false);
  const url = "http://localhost:5000/api/v1/user"
    const [formd,setFormd] = useState({
      type:"recipient",
      name:"",
      place:"",
      govtid:"",
    })
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      await fetch(`${url}`, {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(formd),
      }).then((res) => {
        console.log(res);
        setIsLoading(false);
        // navigate("/success")
      });
    }
    const handleform = (e) => {
      setFormd({
        ...formd,
        [e.target.name] : e.target.value,
      });
    };
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
            <form onSubmit={handleSubmit}>
            <div>
              <span className="relative mt-6 md:mt-0 bottom-5 lg:bottom-20 font-Pantel text-4xl text-indigo-500 tracking-wider font-medium underline block text-center">RECIPIENT</span>
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Full Name"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                onChange={handleform}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Place of Business</label>
              <input
                type="text"
                name="place"
                placeholder="Enter the place of your business"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                onChange={handleform}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Govt Authorized ID</label>
              <input
                type="text"
                name="govtid"
                placeholder="Enter Govt Authorized ID number"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                onChange={handleform}
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
                >
                  Create Account
                </button>
              </>
            )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
