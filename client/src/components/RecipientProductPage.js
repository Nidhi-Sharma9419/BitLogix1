import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecipientNavbar from "./RecipientNavbar";
import Loader from "./Loader"
export default function RecipientProductPage() {
  const url = process.env.REACT_APP_BACKEND_URL;
  const [data, setData] = useState([""]);
  const [isloading, setIsloading] = useState(false);
  const { account } = useWeb3React();
  const fetchdata = () => {
    setIsloading(true);
    fetch(`${url}/api/v1/recipient/${account}`)
      .then((res) => res.json())
      .then((datas) => {
        setData(datas.response);
        setIsloading(false);
      });
  };
  useEffect((account) => {
    fetchdata();
  }, []);
  return (
    <>
      <RecipientNavbar />
      <div className="flex flex-wrap items-center justify-end px-5 py-5">
      </div>
      <div className="">
        {isloading ? (
          <div className="min-w-[98vw]">
            <Loader />
          </div>
        ) : (
          <>
            {data.length ? (
              <>
                <div className="flex flex-col gap-5 p-4">
                  {data.map((pro, index) => {
                    return (
                      <div
                        key={index}
                        className="bg-gray-100 hover:bg-gray-200 rounded-lg px-5 py-3 md:w-[96vw] w-[90vw]"
                      >
                        <div className="flex justify-between">
                          <Link to={`/delivery/${pro._id}`}>
                            <p className="font-bold text-2xl hover:underline">
                              {pro.name}
                            </p>
                          </Link>
                          <div>
                            {pro.delivered ? (
                              <p className="font-bold text-gray-500">
                                Delivered
                              </p>
                            ) : (
                              <>
                                <div className="mt-1 flex items-center gap-x-1.5">
                                  <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                                  </div>
                                  <p className=" font-bold leading-5 text-gray-500">
                                    In-transit
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <p>From: {pro.enterpriseaddress}</p>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <h1 className="text-center font-bold text-2xl mt-20">
                  No product deliveries done!!
                </h1>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
