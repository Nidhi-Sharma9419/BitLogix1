import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

export default function AddDelivery() {
  const url = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const PickUp_Address = "5331 Rexford Court, Montgomery AL 36116";
  const Delivery_Address = "6095 Terry Lane, Golden CO 80403";
  const id = "650db28ef84dbb9cdc81734a"
  // State to store the selected delivery date
  const [deliveryDate, setDeliveryDate] = useState(null);

  const handleDateChange = (date) => {
    setDeliveryDate(date);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch(`${url}/api/v1/product/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        deliverydate: deliveryDate,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <>
      <span className="font-Pantel text-4xl text-[#39FF14] tracking-wider font-medium underline block text-center mt-5">
        ENTERPRISE
      </span>
      <div className="flex flex-row-reverse flex-wrap justify-center lg:justify-evenly items-center lg:min-h-[100vh] min-h-[80vh]">
        <img
          src={"/takeoff.PNG"}
          alt="product-img"
          className="lg:w-[50rem] lg:h-[30rem] w-[10rem] h-[10rem]"
        />
        <div>
          <div className="flex flex-wrap justify-between items-center text-center">
            <div className="block w-full md:w-auto">
              <p className="font-bold text-2xl">Pickup Place</p>
              <p className="font-semibold text-md">{PickUp_Address}</p>
            </div>
            <i className="text-[2rem] fa-solid fa-arrow-right block text-center w-full md:w-auto"></i>
            <div className="block w-full md:w-auto">
              <p className="font-bold text-2xl">Destination Place</p>
              <p className="font-semibold text-md">{Delivery_Address}</p>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap flex-col justify-center mt-12 gap-2 mx-12 md:mx-0">
              <div>
                <label className="font-semibold text-2xl">
                  Select Delivery Date{" "}
                </label>
                <DatePicker
                  selected={deliveryDate}
                  onChange={handleDateChange}
                  minDate={new Date()} // Set minimum date as today
                  dateFormat="dd/MM/yyyy"
                  className="p-2 rounded-lg border-blue-200 border-2"
                  required
                />
              </div>
              {deliveryDate && (
                <p className="font-semibold text-2xl">
                  Your product will be delivered by{" "}
                  <span className="text-sky-500">
                    {deliveryDate.toDateString()}
                  </span>
                </p>
              )}
            </div>
            <button
              // type="submit"
              className="w-full block bg-green-500 hover:bg-green-400  text-white font-semibold rounded-lg
                  px-4 py-3 mt-6"
            >
              Confirm Delivery
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
