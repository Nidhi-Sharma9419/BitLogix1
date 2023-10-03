import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import RecipientNavbar from "./RecipientNavbar";
import Loader from "./Loader";
import { Link } from "react-router-dom";

export default function InventoryRec() {
  const url = process.env.REACT_APP_BACKEND_URL;
  const { account } = useWeb3React();
  const [data, setData] = useState([""]);
  const [isloading, setIsloading] = useState(false);
  const fetchdata = () => {
    setIsloading(true);
    fetch(`${url}/api/v1/inventoryrec/${account}`)
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
      <div className="">
        {isloading ? (
          <div className="min-w-[90rem]">
            <Loader />
          </div>
        ) : (
          <>
            {data.length ? (
              <>
                <div className="p-4 flex justify-between">
                  <p className="font-bold text-2xl underline">Enterprise</p>
                  <p className="font-bold text-2xl underline">
                    Products Received
                  </p>
                </div>
                <div className="flex flex-col gap-5 p-4">
                  {data.map((pro, index) => {
                    return (
                      <div
                        key={index}
                        className="bg-gray-100 hover:bg-gray-200 rounded-lg px-5 py-3 md:w-[96vw] w-[90vw]"
                      >
                        <div className="flex justify-between">
                          <div>
                            <Link to={`/inventoryrec/${account}`}>
                              <p className="font-bold text-2xl hover:underline">
                                {pro.enterprisename}
                              </p>
                            </Link>
                            <p className="font-semibold text-xl">
                              {pro.enterpriseaddress}
                            </p>
                          </div>
                          <button className="text-2xl font-bold">
                            {pro.sumqty}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="flex justify-center items-center mt-20">
                <h1 className="text-center font-bold text-2xl">
                  No product deliveries done!!
                </h1>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
