import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EnterpriseNavbar from "./EnterpriseNavbar";
import Loader from "./Loader";

export default function QualityEnt() {
  const url = process.env.REACT_APP_BACKEND_URL;
  const [data, setData] = useState([""]);
  const [isloading, setIsloading] = useState(false);
  const { account } = useWeb3React();
  const fetchdata = () => {
    setIsloading(true);
    fetch(`${url}/api/v1/qaent/${account}`)
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
      <EnterpriseNavbar />
      <div className="">
        {isloading ? (
          <div className="min-w-[90rem]">
            <Loader />
          </div>
        ) : (
          <>
            {data.length ? (
              <>
                <div className="flex flex-col gap-5 p-4">
                  {data.map((user, index) => {
                    return (
                      <div
                        key={index}
                        className="bg-gray-100 hover:bg-gray-200 rounded-lg px-5 py-3 md:w-[96vw] w-[90vw]"
                      >
                        <div className="flex justify-between">
                          <p className="font-bold text-2xl hover:underline">
                            {user.name}
                          </p>
                          <div className="flex items-center gap-3">
                            {user.mobilenumber || user.email || user.other ? (
                              <>
                                {user?.mobilenumber ? (
                                  <>
                                    <a
                                      href={`tel:${user.mobilenumber}`}
                                      className="transititext-primary text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                                    >
                                      <svg
                                        height="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                      >
                                        <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                                      </svg>
                                    </a>
                                  </>
                                ) : (
                                  <></>
                                )}
                                {user?.email ? (
                                  <>
                                    <a
                                      href={`mailto:${user.email}`}
                                      target="_top"
                                      className="transititext-primary text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="1em"
                                        viewBox="0 0 512 512"
                                      >
                                        <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                                      </svg>
                                    </a>
                                  </>
                                ) : (
                                  <></>
                                )}
                                {user?.other ? (
                                  <>
                                    <a
                                      href={user.other}
                                      target
                                      className="transititext-primary text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="1em"
                                        viewBox="0 0 640 512"
                                      >
                                        <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" />
                                      </svg>
                                    </a>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </>
                            ) : (
                              <>
                                <p className="font-semibold text-xl">
                                  No contact info
                                </p>
                              </>
                            )}
                          </div>
                          <div>
                            <button className="bg-green-200 rounded-lg p-2">
                              Reward
                            </button>
                          </div>
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
