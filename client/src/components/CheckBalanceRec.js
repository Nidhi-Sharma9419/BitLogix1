import React, { useState } from "react";
import RecipientNavbar from "./RecipientNavbar";
export default function CheckBalanceRec() {
  const [recaddress, setRecaddress] = useState("");
  const [data, setData] = useState();
  const [productData, setProductData] = useState();
  const handledetails = async (e) => {
    e.preventDefault();
    setData({
      name: "suraj",
      place: "Hyderabad",
      govtid: "123456789",
    });
  };
  const handleproduct = async (e) => {
    e.preventDefault();
    setProductData({
      name: "monitor",
      price: 0.1245,
      quantity: 2,
      pickup: "US, 74589",
      destination: "NY, 50847",
      recipientaddress: "0x12345",
    });
  };
  return (
    <>
      <RecipientNavbar />
      <div className="my-5 flex flex-wrap justify-around gap-5">
        <div className="flex flex-col justify-start gap-5">
          <div className="flex gap-5">
            <button className="bg-sky-200 p-2 rounded-lg font-bold">
              Contract Balance
            </button>
            <p className="text-center bg-gray-200 rounded-lg p-2 px-5 border-2">
              4552
            </p>
          </div>
          <div className="flex gap-5">
            <button className="bg-indigo-300 p-2 rounded-lg font-bold">
              Deposit
            </button>
            <input
              type="number"
              name="deposit"
              placeholder="unit256"
              className="w-[150px] px-4 py-3 rounded-lg bg-gray-200  border focus:border-blue-500 focus:bg-white focus:outline-none"
              required
            />
          </div>
        </div>
        <div className="">
          <form
            onSubmit={handledetails}
            className="flex flex-wrap items-center gap-5"
          >
            <input
              type="text"
              name="recipientaddress"
              placeholder="Enter Enterprise address"
              className="px-4 py-3 rounded-lg bg-gray-200  border focus:border-blue-500 focus:bg-white focus:outline-none"
              required
              onChange={(e) => setRecaddress(e.target.value)}
            />
            <button className="bg-green-300 p-2 rounded-lg font-semibold">
              Get Details
            </button>
          </form>
          {data ? (
            <>
              <div className=" text-2xl flex flex-col gap-3">
                <p>
                  <span className="font-bold">Name: </span>
                  {data.name}
                </p>
                <p>
                  <span className="font-bold">Place of Business: </span>
                  {data.place}
                </p>
                <p>
                  <span className="font-bold">Government ID: </span>
                  {data.govtid}
                </p>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="">
          <form
            onSubmit={handleproduct}
            className="flex flex-wrap items-center gap-5"
          >
            <div>
              <input
                type="text"
                name="enterpriseaddress"
                placeholder="Enter Enterprise address"
                className="px-4 py-3 rounded-lg bg-gray-200  border focus:border-blue-500 focus:bg-white focus:outline-none"
                required
                onChange={(e) => setRecaddress(e.target.value)}
              />
              <br />
              <input
                type="text"
                name="productindex"
                placeholder="Enter Product Index"
                className="mt-3 px-4 py-3 rounded-lg bg-gray-200  border focus:border-blue-500 focus:bg-white focus:outline-none"
                required
                onChange={(e) => setRecaddress(e.target.value)}
              />
            </div>
            <button className="self-start bg-red-300 p-2 rounded-lg font-semibold">
              Get Details
            </button>
          </form>
          {productData ? (
            <>
              <div className=" text-2xl flex flex-col gap-3">
                <p>
                  <span className="font-bold">Name: </span>
                  {productData.name}
                </p>
                <p>
                  <span className="font-bold">Price: </span>
                  {productData.price}
                </p>
                <p>
                  <span className="font-bold">Quantity: </span>
                  {productData.quantity}
                </p>
                <p>
                  <span className="font-bold">Pickup: </span>
                  {productData.pickup}
                </p>
                <p>
                  <span className="font-bold">Destination: </span>
                  {productData.name}
                </p>
                <p>
                  <span className="font-bold">Recipient: </span>
                  {productData.recipientaddress}
                </p>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
