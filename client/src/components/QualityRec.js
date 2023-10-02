import React, { useState, useEffect } from "react";
import RecipientNavbar from "./RecipientNavbar";
import { useWeb3React } from "@web3-react/core";
import Loader from "./Loader";

export default function QualityRec() {
  const url = process.env.REACT_APP_BACKEND_URL;
  const [isloading, setIsloading] = useState(false);
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [other, setOther] = useState();
  const { account } = useWeb3React();
  const [Loading, setisLoading] = useState(false);
  const [rewards, setRewards] = useState([]);
  const [data, setData] = useState("");
  const fetchdata = () => {
    setisLoading(true);
    fetch(`${url}/api/v1/user/${account}`)
      .then((res) => res.json())
      .then((datas) => {
        setData(datas.response);
        if (datas.response.email && datas.response.mobilenumber && datas.response.other) {
          fetchrewards();
        } else {
          setisLoading(false)
        }
      });
  };
  const fetchrewards = async () => {
    setisLoading(true);
    await fetch(`${url}/api/v1/rewards/${account}`)
      .then((res) => res.json())
      .then((datas) => {
        setRewards(datas.response);
        setisLoading(false);
      });
  };
  useEffect((account) => {
    fetchdata();
  }, []);
  const handleSave = async (e) => {
    e.preventDefault();
    setIsloading(true);
    await fetch(`${url}/api/v1/user/${account}`, {
      method: "PUT",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: email,
        mobilenumber: mobile,
        other: other,
      }),
    }).then((res) => res.json())
    .then((datas) => {
      setData(datas.response);
      console.log(datas.response);
      setisLoading(true);
      fetchrewards();
      setIsloading(false);
    });
  };
  return (
    <>
      <RecipientNavbar />
      {Loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          {(data?.email && data?.mobilenumber && data?.other) ? (
            <>
              {rewards.length ? (
                <>
                  <div className="flex flex-col gap-5 p-4">
                    {rewards.map((reward, index) => {
                      return (
                        <div
                          key={index}
                          className="bg-gray-100 hover:bg-gray-200 rounded-lg px-5 py-3 md:w-[96vw] w-[90vw]"
                        >
                          <div className="flex justify-between">
                              <p className="font-bold text-2xl hover:underline">
                                {reward.enterprisename}
                              </p>
                            <div>
                              <button className="bg-green-200 p-2 rounded-full font-bold">Reward Received</button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  <p className="font-bold text-center text-3xl my-20">No rewards were sent to you</p>
                </>
              )}
            </>
          ) : (
            <>
              <div className="flex flex-wrap justify-evenly items-center min-h-[85vh]">
                <img
                  src="../contactme.avif"
                  alt="img-vect"
                  className="lg:w-[35rem] lg:h-[35rem]"
                />
                <div
                  className="px-5 flex items-center justify-center"
                  style={{ width: "30rem" }}
                >
                  <form className="w-full h-100" onSubmit={handleSave}>
                    <div>
                      <span className="relative mt-6 md:mt-0 bottom-5 lg:bottom-20 font-Pantel text-4xl text-indigo-500 tracking-wider font-medium underline block text-center">
                        Contact Me
                      </span>
                      <label className="block text-gray-700">Email</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="abcd@bitlogix.com"
                        className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        name="number"
                        placeholder="+1 9874562"
                        className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                        onChange={(e) => setMobile(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700">other</label>
                      <input
                        type="text"
                        name="other"
                        placeholder="https://twitter.com/BitLogix_"
                        className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                        onChange={(e) => setOther(e.target.value)}
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
                          save details
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          // type="submit"
                          className="w-full block bg-indigo-500 hover:bg-indigo-400  text-white font-semibold rounded-lg
                  px-4 py-3 mt-6"
                        >
                          save details
                        </button>
                      </>
                    )}
                  </form>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
