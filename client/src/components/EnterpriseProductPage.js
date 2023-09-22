import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function EnterpriseProductPage() {
  const url = process.env.REACT_APP_BACKEND_URL;
  const [data, setData] = useState();
  const [isloading, setIsloading] = useState(false);
  const { account } = useWeb3React();
  const fetchdata = () => {
    setIsloading(true);
    fetch(`${url}/api/v1/enterprise/${account}`)
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
      <div className="flex flex-wrap items-center justify-end px-5 py-5">
        <Link to="/addproduct">
        <button className=" bg-green-400 p-2 px-3 rounded-full">
          Add product
        </button>
        </Link>
      </div>
      <div>
        {isloading ? (
          <>loading</>
        ) : (
          <>
            {data ? (
              <>
                <ol className="list-decimal">
                  {data.map((pro, index) => {
                    return (
                      <li key={index}>
                        <p className="font-bold text-2xl">{pro.name}</p>
                      </li>
                    );
                  })}
                </ol>
              </>
            ) : (
              <>
                <h1 className="text-center font-bold">
                  No product deliveries done in the past
                </h1>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
