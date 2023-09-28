import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EnterpriseNavbar from "./EnterpriseNavbar";
import Loader from "./Loader";

export default function QualityEnt() {
  const url = process.env.REACT_APP_BACKEND_URL;
  const [data, setData] = useState([""]);
  const [usersdata, setUsersData] = useState([{}]);
  const [isloading, setIsloading] = useState(false);
  const { account } = useWeb3React();
  const fetchdata = () => {
    setIsloading(true);
    fetch(`${url}/api/v1/enterprise/${account}`)
      .then((res) => res.json())
      .then((datas) => {
        setData(datas.response);
        getusers(datas.response);
        setIsloading(false);
      });
  };
  const getusers = async (pros) => {
    const uss = [];

    pros.forEach(async (product) => {
      console.log(product);
      // console.log("user", product);
      await fetch(`${url}/api/v1/user/${product.recipientaddress}`)
        .then((ress) => ress.json())
        .then((datass) => {
          console.log(datass.response);
          uss.push(datass.response);
          console.log(uss);
          // setUsersData(uss);
          // setUsersData([...usersdata,uss])
          // let userss = usersdata;
          // userss.push(datass.response);
          // setUsersData(userss);
          // console.log("user data: ", datass.response);
          // setUsersData([...usersdata,datass.response]);
          // console.log("first",usersdata[0]);
          // setIsloading(false);
        });
      setUsersData(uss);
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
                  {usersdata.map((user, index) => {
                    return (
                      <p>{user?.address}</p>
                      // <div
                      //   key={index}
                      //   className="bg-gray-100 hover:bg-gray-200 rounded-lg px-5 py-3 md:w-[96vw] w-[90vw]"
                      // >
                      //   <div className="flex justify-between">
                      //       <p className="font-bold text-2xl hover:underline">
                      //         {user.name}
                      //       </p>
                      //     <div>
                      //       <button className="bg-green-200 rounded-lg p-2">Reward</button>
                      //       {/* {pro.delivered ? (
                      //         <p className="font-bold text-gray-500">
                      //           Delivered
                      //         </p>
                      //       ) : (
                      //         <>
                      //           <div className="mt-1 flex items-center gap-x-1.5">
                      //             <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                      //               <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                      //             </div>
                      //             <p className=" font-bold leading-5 text-gray-500">
                      //               In-transit
                      //             </p>
                      //           </div>
                      //         </>
                      //       )} */}
                      //     </div>
                      //   </div>
                      // </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="flex justify-center items-center">
                <h1 className="text-center font-bold">
                  No product deliveries done in the past
                </h1>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
