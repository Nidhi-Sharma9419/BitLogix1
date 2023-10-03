import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipientNavbar from "./RecipientNavbar";
import { useWeb3React } from "@web3-react/core";
import Loader from "./Loader";

export default function InventoryEntCard() {
  const { address } = useParams();
  const url = process.env.REACT_APP_BACKEND_URL;
  const { account } = useWeb3React();
  const [data, setData] = useState([""]);
  const [isloading, setIsloading] = useState(false);
  const [triggerlevel, setTriggerlevel] = useState();
  const [reduction,setReduction] = useState();
  const [type, setType] = useState();
  const fetchdata = async () => {
    setIsloading(true);
    // fetch(`${url}/api/v1/inventory/${account}/${address}`)
    //   .then((res) => res.json())
    //   .then((datas) => {
    //     setData(datas.response);
    //     setIsloading(false);
    //   });
    await fetch(`${url}/api/v1/inventory/${account}/${address}`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((datas) => {
        setData(datas.response);
        setIsloading(false);
      });
    setIsloading(false);
  };

  useEffect((account) => {
    fetchdata();
  }, []);

  const handletrigger = async (e) => {
    e.preventDefault();
    fetch(`${url}/api/v1/inventory/${data._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reordertype: "productwise",
        triggerlevel: triggerlevel,
      }),
    })
      .then((response) => response.json())
      .then((datas) => {
        setData(datas.response);
      });
  };

  const handlereduction = async (e) => {
    e.preventDefault();
    fetch(`${url}/api/v1/inventory/${data._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productsavailable:data.productsavailable-reduction
      }),
    })
      .then((response) => response.json())
      .then((datas) => {
        setData(datas.response);
      });
  };
  return (
    <>
      <RecipientNavbar />
      {isloading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <div>
            {data ? (
              <>
                <div>
                  <div className="text-center text-2xl my-5">
                    <p className="font-semibold">
                      <span className="font-bold">Enterprise name: </span>
                      {data.enterprisename}
                    </p>
                    <p className="font-semibold">
                      <span className="font-bold hidden lg:inline-block">
                        Enterprise Address:{" "}
                      </span>
                      {data.enterpriseaddress}
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-around">
                    <div>
                      <p className="font-semibold text-2xl">
                        Products Available
                      </p>
                      <p className="font-bold text-2xl">
                        {data.productsavailable}
                      </p>
                      {type === "productwise" ? (
                        // &&data.triggerlevel < data.productsavailable &&
                        // data.triggerlevel > 0
                        <>
                          <div className="flex gap-5 mt-5">
                            <div>
                              <label className="block text-gray-700">
                                Specify Reason for Reduction
                              </label>
                              <input
                                type="text"
                                name="reason"
                                placeholder="sold out, damaged ...."
                                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700">
                                Enter the reduction level
                              </label>
                              <input
                                type="number"
                                name="level"
                                placeholder="1000"
                                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                onChange={(e)=>setReduction(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <div className="flex gap-5 my-5">
                            <div>
                              <p className="font-semibold">After Reduction</p>
                              <p className="font-bold text-2xl">
                                {data.productsavailable - reduction}
                              </p>
                            </div>
                            <button className="bg-green-200 font-bold rounded-lg p-2 w-full" onClick={handlereduction}>
                              Save
                            </button>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div>
                      <div className="flex gap-5">
                        <div>
                          <button
                            className="bg-sky-200 p-2 rounded-lg"
                            onClick={() => setType("datewise")}
                          >
                            Set Date wise
                          </button>
                        </div>
                        <div>
                          <button
                            className="bg-red-200 p-2 rounded-lg"
                            onClick={() => setType("productwise")}
                          >
                            Set Product Wise
                          </button>
                        </div>
                      </div>
                      {type ? (
                        <>
                          {type === "productwise" ? (
                            <>
                              <div className="my-5">
                                <form>
                                  <label className="block text-gray-700">
                                    Specify trigger level
                                  </label>
                                  <input
                                    type="number"
                                    name="triggerlevel"
                                    placeholder="2000"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                    onChange={(e) =>
                                      setTriggerlevel(e.target.value)
                                    }
                                    required
                                  />
                                  <button
                                    className="bg-green-200 p-2 rounded-lg font-bold w-full mt-5"
                                    onClick={handletrigger}
                                  >
                                    save
                                  </button>
                                </form>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="my-5">calender</div>
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
            ) : (
              <></>
            )}
          </div>
        </>
      )}
    </>
  );
}
