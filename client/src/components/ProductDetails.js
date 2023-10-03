import { useWeb3React } from "@web3-react/core";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

import bitLogixContractABI from "../ABI/BitLogix.json";
import { ethers , getBigInt} from "ethers";
import { BigNumber} from "@ethersproject/bignumber";
import EnterpriseNavbar from "./EnterpriseNavbar";





export default function ProductDetails() {
  const url = process.env.REACT_APP_BACKEND_URL;
  const {account, library} = useWeb3React();
  
  const navigate = useNavigate();
  const [isloading, setIsLoading] = useState(false);
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [pickupPlace, setPickupPlace] = useState();
  const [destinationPlace, setDestinationPlace] = useState();
  const [recipientAddress, setRecipientAddress] = useState();
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [products, setProducts] = useState([]);

  const handleDateChange = (date) => {
    setDeliveryDate(date);
  };
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try{
      const bitLogixContractAddress="0x6fa424C2379E7b86d039562dA5E8b6E25dcc4af5";
      const bitLogixContract = new ethers.Contract(bitLogixContractAddress, bitLogixContractABI, library.getSigner());
 
      const price = ethers.parseUnits("0.000000000000005", "ether");
      const quantity = getBigInt(1);

      const result = price*(quantity);

      console.log(result.toString());
      const totalPaymentInBTT =result;
      const gasLimit = ethers.parseUnits("20000000", "wei");
      const tx = await bitLogixContract.createProduct(
        name,
        totalPaymentInBTT,
        quantity,
        pickupPlace,
        destinationPlace,
        recipientAddress,
        { gasLimit: gasLimit }
      );
   
      //await tx.wait();
      //await provider.getTransactionReceipt(tx.hash)
      console.log("Transaction hash:", tx.hash);
    console.log("Fetching transaction receipt...");

    let receipt = null;

    while (receipt === null) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        receipt = await provider.getTransactionReceipt(tx.hash);

        if (receipt === null) {
          console.log("Trying again to fetch transaction receipt...");
          await sleep(3000); // Wait for 3 seconds before retrying (optional)
          continue;
        }

        console.log("Receipt confirmations:", receipt.confirmations);
        console.info(`Transaction receipt: ${tx.hash}`);

        // Assuming you have a function to fetch and update the product list
        console.log("Working?");
    /*await fetchProducts(); //need to make a function to fetch and update the product list

    setName("");
    setPrice("");
    setQuantity("");
    setPickupPlace("");
    setDestinationPlace("");
    setRecipientAddress("");
    setDeliveryDate(null);
      */
      navigate("/products");
        

        
      } catch (error) {
        console.log("Receipt error:", error);
        break;
      }
    }
  } catch (error) {
    console.error("Error creating product:", error);
  } finally {
    setIsLoading(false);
  }
  await fetch(`${url}/api/v1/product`, {
    method: "POST",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      name: name,
      price: price,
      quantity: quantity,
      pickup: pickupPlace,
      destination: destinationPlace,
      recipientaddress: recipientAddress,
      enterpriseaddress: account,
      deliverydate: deliveryDate,
    }),
  }).then((res) => {
    navigate("/products");
    setIsLoading(false);
  });
  setIsLoading(false);
};


// Helper function to sleep for a given number of milliseconds
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
      
     

     
  /*  

  const fetchProducts = async() =>{

    try{
      const bitLogixContractAddress = "0x6fa424C2379E7b86d039562dA5E8b6E25dcc4af5";
      

      const bitLogixContract = new ethers.Contract(bitLogixContractAddress, bitLogixContractABI, library);
      const products = await bitLogixContract.enterpriseProducts(account);
      //const products = [];

      

      setProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    // Fetch and update the product list when the component mounts
    fetchProducts();
  }, [account, library]);*/

  const confirmDelivery = async (productIndex) => {
    setIsLoading(true);

    try {
      const bitLogixContractAddress = "0x6fa424C2379E7b86d039562dA5E8b6E25dcc4af5";

      const bitLogixContract = new ethers.Contract(bitLogixContractAddress, bitLogixContractABI, library.getSigner());

      // Call the confirmReceipt function on the smart contract
      const tx = await bitLogixContract.confirmReceipt(account, productIndex);
      await tx.wait();
      // Assuming you have a function to fetch and update the product list
      //await fetchProducts();

      // Show a success message or update the UI as needed
    } catch (error) {
      console.error("Error confirming delivery:", error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
    <EnterpriseNavbar />
      <div className="flex flex-row-reverse flex-wrap justify-evenly items-center min-h-[100vh]">
        <img
          src="/enterprise.png"
          alt="img-vect"
          className="lg:w-[35rem] lg:h-[35rem] lg:mb-24"
        />
        <div
          className="px-5 flex items-center justify-center"
          style={{ width: "30rem" }}
        >
          <div className="w-full h-100 space-y-4">
            <form onSubmit={handleSubmit}>
              <div>
                
                <label className="block text-gray-700 mt-10">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="lorem ipsum"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Price per unit</label>
                <input
                  type="text"
                  name="number"
                  placeholder="40$"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Quantity</label>
                <input
                  type="number"
                  name="name"
                  placeholder="40"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">PickUp Address</label>
                <input
                  type="text"
                  name="name"
                  placeholder="5331 Rexford Court, Montgomery AL 36116"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  onChange={(e) => setPickupPlace(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">
                  Destination Address
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="6095 Terry Lane, Golden CO 80403"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  onChange={(e) => setDestinationPlace(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Recipient Address</label>
                <input
                  type="text"
                  name="name"
                  placeholder="0x63c6770FEb4dcc984c71Ce7Df2928ED400027aC9"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Select Delivery Date</label>
                <DatePicker
                  selected={deliveryDate}
                  onChange={handleDateChange}
                  minDate={new Date()} // Set minimum date as today
                  dateFormat="dd/MM/yyyy"
                  className="p-2 rounded-lg border-blue-200 border-2"
                  required
                  placeholderText="expected date"
                />
              </div>
              {isloading ? (
                <>
                  <button
                    disabled
                    // type="submit"
                    className="cursor-progress w-full block bg-gray-500  text-white font-semibold rounded-lg
                    px-4 py-3 mt-6"
                  >
                    Almost Done...
                  </button>
                </>
              ) : (
                <>
                  <button
                    // type="submit"
                    className="w-full block bg-green-500 hover:bg-green-400  text-white font-semibold rounded-lg
                    px-4 py-3 mt-6"
                  >
                    Proceed to Deliver
                  </button>
                </>
              )}
              {products.map((product, index) => (
          <div key={index}>
            <h3>{product.name}</h3>
            <p>Price: {product.Price}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Pickup Place: {product.pickupPlace}</p>
            <p>Destination Place: {product.destinationPlace}</p>
            <p>Recipient Address: {product.recipientAddress}</p>
            <p>Is Delivered: {product.isDelivered ? "Yes" : "No"}</p>

            {!product.isDelivered && (
              <button
                onClick={() => confirmDelivery(index)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Confirm Delivery
              </button>
            )}
          </div>
        ))}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
