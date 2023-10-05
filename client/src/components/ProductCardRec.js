import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipientNavbar from "./RecipientNavbar";
import Loader from "./Loader";

export default function ProductCardRec() {
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
  // var noday = 0
  const handlestatus = async (e) => {
    e.preventDefault();
    fetch(`${url}/api/v1/product/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        delivered: true,
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
          <div className="my- flex flex-wrap justify-center lg:justify-evenl items-center lg:min-h-[90vh] min-h-[80vh]">
            <img
              src={"/landing.png"}
              alt="product-img"
              className="lg:w-[40rem] lg:h-[30rem] w-[15rem] h-[15rem]"
            />
            {data.delivered ? (
              <>
                <form
                  // onSubmit={handleconfirm}
                  className="flex flex-col gap-3"
                >
                  <div>
                    <label className="block text-gray-700">
                      Enterprise Address
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="0x123456789"
                      className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                      //   onChange={handleform}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Product Index</label>
                    <input
                      type="text"
                      name="place"
                      placeholder="Enter the product index"
                      className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                      //   onChange={handleform}
                      required
                    />
                  </div>
                  <button className=" bg-green-300 hover:bg-green-400 p-2 rounded-lg font-bold">
                    Confirm Receipt
                  </button>
                </form>
              </>
            ) : (
              <>
                <div>
                  <p className="text-2xl my-3 ">
                    <span className="font-bold">From: </span>
                    {data.enterpriseaddress}
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
                    {data.quantity}
                  </p>
                  <div className="flex flex-wrap justify-between items-center text-center gap-5 border-2 rounded-lg p-5">
                    <div className="block w-full md:w-auto">
                      <p className="font-bold text-2xl">Pickup Place</p>
                      <p className="font-semibold text-md">{data.pickup}</p>
                    </div>
                    <i className="text-[2rem] fa-solid fa-arrow-right block text-center w-full md:w-auto"></i>
                    <div className="block w-full md:w-auto">
                      <p className="font-bold text-2xl">Destination Place</p>
                      <p className="font-semibold text-md">
                        {data.destination}
                      </p>
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
                        {Math.round(noday) > 0 ? (
                          <>
                            <p className="font-semibold text-2xl">
                              Your product will be delivered in{" "}
                              {Math.round(noday)} days
                            </p>
                            <p className="font-semibold text-md">
                              Recieved the product?{" "}
                              <span
                                className="font-bold hover:underline cursor-pointer"
                                onClick={handlestatus}
                              >
                                click here to change the product delivery status
                              </span>
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="font-semibold text-md text-justify">
                              The time set by enterprise has lapsed,{" "}
                              <span
                                className="font-bold hover:underline cursor-pointer"
                                onClick={handlestatus}
                              >
                                click here to change the product delivery status
                              </span>{" "}
                              if you recieve the product.
                            </p>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
