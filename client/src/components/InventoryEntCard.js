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
  const [reduction, setReduction] = useState();
  // const [type, setType] = useState();
  // const [datenotif, setDatenotif] = useState();
  const fetchdata = async () => {
    if (account) {
      setIsloading(true);
      fetch(`${url}/api/v1/inventory/${account}/${address}`, {
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
    } else {
      setData(false);
    }
    // setIsloading(false);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const [isload, setIsload] = useState(false);

  const handledatenotif = async (e, da) => {
    e.preventDefault();
    setIsload(true);
    fetch(`${url}/api/v1/inventory/${data._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: da,
      }),
    })
      .then((response) => response.json())
      .then((datas) => {
        setData(datas.response);
        setIsload(false);
      });
  };
  const [triggerloading, setTriggerloading] = useState(false);
  const handletrigger = async (e) => {
    e.preventDefault();
    setTriggerloading(true);
    fetch(`${url}/api/v1/inventory/${data._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        triggerlevel: triggerlevel,
      }),
    })
      .then((response) => response.json())
      .then((datas) => {
        setData(datas.response);
        setTriggerloading(false);
      });
  };
  const dates = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  const [redload, setRedload] = useState(false);
  const handlereduction = async (e) => {
    e.preventDefault();
    setRedload(true);
    fetch(`${url}/api/v1/inventory/${data._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productsavailable: data.productsavailable - reduction,
      }),
    })
      .then((response) => response.json())
      .then((datas) => {
        setData(datas.response);
        setRedload(false);
      });
  };

  const [typeloading, setTypeLoading] = useState(false);
  const handletype = async (e, ordertype) => {
    e.preventDefault();
    setTypeLoading(true);
    fetch(`${url}/api/v1/inventory/${data._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reordertype: ordertype,
      }),
    })
      .then((response) => response.json())
      .then((datas) => {
        setData(datas.response);
        setTypeLoading(false);
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
          <div className="my-10">
            {data ? (
              <>
                <div>
                  <div className="text-center text-2xl my-5">
                    <p className="font-semibold">
                      <span className="font-bold">Enterprise name: </span>
                      {data.enterprisename}
                    </p>
                    <p
                      className="font-semibold"
                      style={{ overflowWrap: "break-word" }}
                    >
                      <span className="font-bold">Enterprise Address: </span>
                      {data.enterpriseaddress}
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-evenly items-center lg:mt-10">
                    <div>
                      <p className="font-bold text-2xl">
                        <span className="font-semibold">
                          Products Available:{" "}
                        </span>
                        {data.productsavailable}
                      </p>
                      {/* <p className="font-bold text-2xl">
                        {data.productsavailable}
                      </p> */}
                      {data.reordertype === "productwise" ? (
                        // &&data.triggerlevel < data.productsavailable &&
                        // data.triggerlevel > 0
                        <>
                          {data.triggerlevel ? (
                            <>
                              <form onSubmit={handlereduction} className="px-3">
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
                                      onChange={(e) =>
                                        setReduction(e.target.value)
                                      }
                                      required
                                    />
                                  </div>
                                </div>
                                {redload ? (
                                  <>
                                    <button
                                      disabled
                                      className="cursor-progress bg-green-200 font-bold rounded-lg p-2 w-full h-5rem mt-5"
                                      // onClick={handlereduction}
                                    >
                                      Save
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      className="bg-green-200 font-bold rounded-lg p-2 w-full h-5rem mt-5"
                                      // onClick={handlereduction}
                                    >
                                      Save
                                    </button>
                                  </>
                                )}
                                {/* <div className="flex gap-5 my-5">
                                  <div>
                                    <p className="font-semibold">
                                      After Reduction
                                    </p>
                                    <p className="font-bold text-2xl">
                                      {data.productsavailable - reduction}
                                    </p>
                                  </div>
                                  <button
                                    className="bg-green-200 font-bold rounded-lg p-2 w-full h-5rem"
                                    onClick={handlereduction}
                                  >
                                    Save
                                  </button>
                                </div> */}
                              </form>
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      ) : (
                        <>
                          {data.date ? (
                            <>
                              <p className="text-2xl w-[25rem] shadow-md rounded-lg p-10 mt-5">
                                {data.enterprisename} will be notified on the
                                date of {data.date} every month to send you the
                                products
                              </p>
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      )}
                    </div>

                    <div>
                      {!data.reordertype ? (
                        <>
                          <div className="flex gap-5">
                            <div>
                              {typeloading ? (
                                <>
                                  <button
                                    disabled
                                    className="cursor-progress bg-sky-200 p-2 rounded-lg"
                                    // onClick={() => setType("datewise")}
                                    // onClick={(e)=>handletype(e,"datewise")}
                                  >
                                    Set Date wise
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    className="bg-sky-200 p-2 rounded-lg"
                                    // onClick={() => setType("datewise")}
                                    onClick={(e) => handletype(e, "datewise")}
                                  >
                                    Set Date wise
                                  </button>
                                </>
                              )}
                            </div>
                            <div>
                              {typeloading ? (
                                <>
                                  <button
                                    disabled
                                    className="cursor-progress bg-red-200 p-2 rounded-lg"
                                    // onClick={() => setType("datewise")}
                                    // onClick={(e)=>handletype(e,"datewise")}
                                  >
                                    Set Product wise
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    className="bg-red-200 p-2 rounded-lg"
                                    // onClick={() => setType("datewise")}
                                    onClick={(e) =>
                                      handletype(e, "productwise")
                                    }
                                  >
                                    Set Product wise
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {data.reordertype ? (
                        <>
                          {data.reordertype === "productwise" ? (
                            <>
                              <div className="my-5">
                                {data.triggerlevel ? (
                                  <>
                                    <p className="font-bold text-2xl">
                                      <span className="font-semibold">
                                        Trigger Level:{" "}
                                      </span>
                                      {data.triggerlevel}
                                    </p>
                                  </>
                                ) : (
                                  <>
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
                                      {triggerloading ? (
                                        <>
                                          <button
                                            disabled
                                            className="cursor-progress bg-green-200 p-2 rounded-lg font-bold w-full mt-5"
                                            // onClick={handletrigger}
                                          >
                                            save
                                          </button>
                                        </>
                                      ) : (
                                        <>
                                          <button
                                            className="bg-green-200 p-2 rounded-lg font-bold w-full mt-5"
                                            onClick={handletrigger}
                                          >
                                            save
                                          </button>
                                        </>
                                      )}
                                    </form>
                                  </>
                                )}
                              </div>
                            </>
                          ) : (
                            <div className="flex flex-col justify-center items-center">
                              {data.date ? (
                                <></>
                              ) : (
                                <>
                                  <p className="font-bold text-2xl">
                                    Select a Date to notify{" "}
                                    {data.enterprisename} on this date
                                  </p>
                                </>
                              )}

                              <div className="my-5 flex flex-wrap justify-evenly gap-4 w-[20rem]">
                                {/* {renderDates()} */}
                                {dates.map((da, index) => {
                                  return data.date ? (
                                    <>
                                      <button
                                        key={index}
                                        className={
                                          data.date === da
                                            ? "bg-sky-200 px-2 py-1 w-[35px] h-[35px] rounded-full border-2 border-gray-900 font-bold"
                                            : "bg-sky-200 px-2 py-1 w-[35px] h-[35px] rounded-full"
                                        }
                                        disabled
                                      >
                                        {da}
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      {isload ? (
                                        <>
                                          <button
                                            key={index}
                                            onClick={(e) =>
                                              handledatenotif(e, da)
                                            }
                                            disabled
                                            className="bg-sky-200 px-2 py-1 w-[35px] h-[35px] rounded-full hover:border-2 hover:border-gray-900 hover:font-semibold"
                                          >
                                            {da}
                                          </button>
                                        </>
                                      ) : (
                                        <>
                                          <button
                                            key={index}
                                            onClick={(e) =>
                                              handledatenotif(e, da)
                                            }
                                            className="bg-sky-200 px-2 py-1 w-[35px] h-[35px] rounded-full hover:border-2 hover:border-gray-900 hover:font-semibold"
                                          >
                                            {da}
                                          </button>
                                        </>
                                      )}
                                    </>
                                  );
                                })}
                              </div>
                            </div>
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
              <>
                <p className="text-center font-bold text-xl my-5">
                  Connect to wallet
                </p>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
