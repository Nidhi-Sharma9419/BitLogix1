import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EnterpriseNavbar from "./EnterpriseNavbar";
import Loader from "./Loader";

export default function ProductCardEnt() {
  const { id } = useParams();
  const url = process.env.REACT_APP_BACKEND_URL;
  const [isloading, setIsloading] = useState(false);
  const [data, setData] = useState("");
  const fetchdata = () => {
    setIsloading(true);
    fetch(`${url}/api/v1/product/${id}`)
      .then((res) => res.json())
      .then((datas) => {
        setData(datas.response);
        setIsloading(false);
      });
  };
  useEffect(() => {
    fetchdata();
  }, []);
  var din = new Date();
  var dout = new Date(data.deliverydate);
  var noday = (dout.getTime() - din.getTime()) / (1000 * 3600 * 24);
  return (
    <>
    <EnterpriseNavbar />
      {isloading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <div className="my-5 flex flex-wrap justify-center lg:justify-evenly items-center lg:min-h-[100vh] min-h-[80vh]">
            <img
              src={"/landing.png"}
              alt="product-img"
              className="lg:w-[50rem] lg:h-[30rem] w-[10rem] h-[10rem]"
            />
            <div>
              <p className="text-2xl my-3 ">
                <span className="font-bold">To: </span>
                {data.recipientaddress}
              </p>
              <p className="text-2xl my-3 ">
                <span className="font-bold">Product Name: </span>
                {data.name}
              </p>
              <p className="text-2xl my-3 ">
                <span className="font-bold">Price: </span>
                {data.price}
              </p>
              <p className="text-2xl my-3 ">
                <span className="font-bold">Quantity: </span>
                {data.quantity} KGs
              </p>
              <div className="flex flex-wrap justify-between items-center text-center gap-5 border-2 rounded-lg p-5">
                <div className="block w-full md:w-auto">
                  <p className="font-bold text-2xl">Pickup Place</p>
                  <p className="font-semibold text-md">{data.pickup}</p>
                </div>
                <i className="text-[2rem] fa-solid fa-arrow-right block text-center w-full md:w-auto"></i>
                <div className="block w-full md:w-auto">
                  <p className="font-bold text-2xl">Destination Place</p>
                  <p className="font-semibold text-md">{data.destination}</p>
                </div>
              </div>
              <div className="flex flex-wrap flex-col justify-center mt-12 gap-2 mx-12 md:mx-0">
                {data.delivered ? (
                  <>
                    <button className="cursor-default p-2 bg-green-500 rounded-lg text-white text-2xl font-bold">
                      Reached Destination Place
                    </button>
                  </>
                ) : (
                  <>
                    <button className="cursor-default p-2 bg-indigo-500 rounded-lg text-white text-2xl font-bold">
                      In-Transit
                    </button>
                    <p className="font-semibold text-2xl">
                      Your product will be delivered in {Math.round(noday)} days
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
