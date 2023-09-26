import React from "react";

export default function AboutUs() {
  return (
    <>
      <div className="flex flex-col flex-wrap bg-gray-200 overflow-hidden">
        <div className="flex flex-col items-center h-[150px] bg-[#006B75] text-[#FEC536] md:text-5xl text-3xl font-bold">
          <span className="mt-[60px] font-Pantel">WHO ARE WE ?</span>
        </div>
        <span className="md:text-2xl text-xl font-semibold text-[#61a5c5] block self-center px-3 md:px-16 py-5 border-2  mt-5 md:mx-5">
          Welcome to BitLogiX, where innovation meets logistics. We are a
          passionate team of blockchain enthusiasts dedicated to reshaping the
          future of supply chain management.
        </span>
        <div className="flex flex-row flex-wrap mt-24 border-2 border-[#006B75] rounded-3xl lg:mx-4 lg:py-4 md:justify-center">
          <img
            src={"./vision.png"}
            alt="vision"
            className="lg:w-[20%] w-[90%] block text-center md:w-[50%]"
          />
          <span className="px-8 text-center block lg:self-center text-[#5bd3e6] text-xl font-semibold lg:w-[80%] ">
            At Bitlogix, we envision a world where supply chains are
            transparent, efficient, and secure. We believe that blockchain
            technology can revolutionize the way businesses manage their
            logistics, making operations smoother and more trustworthy.
          </span>
        </div>
        <div className="flex md:flex-row flex-wrap flex-col-reverse mt-24 border-2 border-[#006B75] rounded-3xl lg:mx-4 lg:py-4 md:justify-center">
          <span className="px-8 text-center block text-[#5bd3e6] text-xl font-semibold lg:self-center lg:w-[80%]">
            Our mission is to provide enterprises and recipients with a
            cutting-edge decentralized application (DApp) that simplifies
            logistics, enhances transparency, and ensures secure transactions.
            We are committed to delivering a seamless and rewarding experience
            for our users, driving efficiency and trust within the supply chain
            ecosystem.
          </span>
          <img
            src={"./mission.png"}
            alt="vision"
            className="lg:w-[20%] w-[90%] block text-center md:w-[50%]"
          />
        </div>
        <div className="flex flex-row flex-wrap mt-24 border-2 border-[#006B75] rounded-3xl lg:mx-4 lg:py-4 md:justify-center">
          <img src={"./team.png"} alt="vision" className="lg:w-[20%] w-[90%] block text-center md:w-[50%]" />
          <span className="px-8 text-center block text-[#5bd3e6] text-xl font-semibold lg:self-center lg:w-[80%]">
            Behind BitLogix is a diverse team of professionals with expertise in
            blockchain technology, logistics, and user experience design. We are
            dedicated to creating a solution that empowers businesses and
            individuals to navigate the complexities of supply chain management
            with confidence.
          </span>
        </div>
        <div className="flex md:flex-row flex-wrap flex-col-reverse mt-24 border-2 border-[#006B75] rounded-3xl lg:mx-4 lg:py-4 md:justify-center">
          <span className="px-8 text-center block text-[#5bd3e6] text-xl font-semibold lg:self-center lg:w-[80%]">
            Our mission is to provide enterprises and recipients with a
            cutting-edge decentralized application (DApp) that simplifies
            logistics, enhances transparency, and ensures secure transactions.
            We are committed to delivering a seamless and rewarding experience
            for our users, driving efficiency and trust within the supply chain
            ecosystem.
          </span>
          <img
            src={"./join.png"}
            alt="join us"
            className="lg:w-[20%] w-[90%] block text-center md:w-[50%]"
          />
        </div>
      </div>
    </>
  );
}
