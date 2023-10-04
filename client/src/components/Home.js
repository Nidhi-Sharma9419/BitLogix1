import React from "react";
import Card from "./Card";
import CardData from "./CardData";
import Footer from "./Footer";

export default function Home() {
  return (
    <>
      <div className="flex flex-col flex-wrap bg-gray-200 h-auto">
        <div className="flex md:flex-row my-5 flex-col-reverse md:mt-10">
          <div className="md:w-[50%]">
            <img
              src={"/home-1.png"}
              alt="home"
              className="md:mt-28 lg:ml-28 lg:w-[60%] rounded-lg mx-10 w-[80%] lg:mx-0"
            />
          </div>
          <div className="flex flex-col items-center md:w-[50%] my-5 md:mt-28">
            <h1 className=" font-bold font-Pantel text-6xl">BitLogiX</h1>
            <h3 className="text-xl font-semibold text-center font-mono my-3">
              Elevate Your Business with our DApp
            </h3>
            <span className="text-justify mt-3 font-medium w-[80%] tracking-wide text-lg">
              Experience the synergy of our supply chain DApp, where blockchain
              technology converges with efficient supply chain management.
              Elevate your enterprise to new heights. Our DApp simplifies the
              complex world of supply chain management.
            </span>
          </div>
        </div>
        <div className="flex md:flex-row-reverse flex-col-reverse  justify-around items-center">
          <div className=" hidden md:block">
            <img
              src={"/home-2.png"}
              alt="btt"
              className="lg:mt-20 lg:ml-28 lg:w-[60%] rounded-lg"
            />
          </div>
          <div className="flex flex-col items-center md:w-[50%] my-5 md:mt-28">
            <h1 className="text-[#76b62a] text-center font-bold font-Pantel text-4xl">
              Secure,Swift & Rewarding
            </h1>
            <span className="text-justify mt-3 font-medium w-[80%] tracking-normal text-lg">
              Revolutionize your supply chain with our DApp. The global supply
              chain market, valued at $37.4 billion by 2027, demands
              modernization. Our solution leverages decentralization, smart
              contracts, and cryptographic security. Experience the future with
              real-time tracking, instant payments, and token rewards, unlocking
              endless possibilities.
            </span>
          </div>
        </div>
        <div className="flex md:flex-row flex-col justify-around items-center">
          <div className="w-[100%] md:w-auto flex justify-center">
            <img
              src={"/community.png"}
              alt="btt"
              className="lg:mt-28 lg:ml-28 lg:w-[500px] lg:h-[300px] rounded-lg mx-10 w-[80%] lg:mx-0"
            />
          </div>
          <div className="flex flex-col items-center md:w-[50%] my-5 md:mt-28">
            <h1 className="text-yellow-400 text-center font-bold font-Pantel text-4xl">
              Join the BitLogiX Community
            </h1>
            <span className="text-justify mt-3 font-medium w-[80%] tracking-normal text-lg">
              BitLogix is more than just a platform; it's a thriving community
              of forward-thinkers and passionate supply chain enthusiasts. Our
              unwavering commitment to transparency, security, and innovation
              propels us forward. Join us today, and together, we will pioneer
              the future of supply chain management."
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center mt-28">
          <span className="text-4xl font-semibold font-Pantel">
            WHY <span className="">BitLogiX</span> ?
          </span>
          <div className="flex flex-col md:flex-row flex-wrap justify-center z-10">
            {CardData.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                description={card.description}
                imageUrl={card.imageUrl}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
