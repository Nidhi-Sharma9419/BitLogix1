import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import { useWeb3Context } from ''
const injectedConnector = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 11155111, 80001],
});
const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export default function Navbar() {
  const url = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("");
  const { activate, active, account } = useWeb3React();
  const [type, setType] = useState("");
  useEffect(() => {
    if (account) {
      console.log("Account", account);
      setAddress(account);
      fetch(`${url}/api/v1/user/${account}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.response) {
            if (data.response.type == "enterprise") {
              navigate("/products");
              setType("Enterprise");
            } else {
              navigate("/deliveries");
              setType("Recipient");
            }
          } else {
            navigate("/select");
          }
        });
    }
  }, [account]);

  const connectWallet = async () => {
    console.log("Connecing to wallet...");
    try {
      await activate(injectedConnector);
      console.log("wallet connected");
      console.log("Account", account);
      setConnected(true);
    } catch (error) {
      console.error("Failed to connect", error);
    }
  };
  const navigation = [
    { name: "Home", href: type ? type=="Enterprise"?"/products":"/deliveries":"/", current: true },
    { name: "About", href: "/about", current: false },
  ];
  const disconnectWallet = async () => {
    // navigate("/");
  };
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/">
                    <img
                      src="/3.png"
                      alt="logo"
                      className="w-[6rem] h-[3rem]"
                    />
                  </Link>
                </div>
                <p className="hidden md:block text-white font-bold self-center text-2xl">
                  {type}
                </p>

                <div className="hidden sm:ml-6 sm:block self-center ">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                        // aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                    {/* Connect metamask wallet */}
                    {account ? (
                      <>
                        <button
                          onClick={disconnectWallet}
                          className="font-bold border-2  border-none px-3 py-1 rounded-full  bg-gray-400 hover:bg-gray-500"
                        >
                          Disconnect Wallet
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={connectWallet}
                          className="font-bold border-2 bg-green-400 border-none hover:bg-green-500 px-3 py-1 rounded-full  "
                        >
                          Connect Wallet
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <p className="text-white font-bold">{type}</p>
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-sm font-medium"
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              {/* <Disclosure.Button> */}
                {/* Connect metamask wallet */}
                {account ? (
                  <>
                    <button
                      onClick={disconnectWallet}
                      className="font-bold border-2  border-none px-3 py-1 rounded-full  bg-gray-400 hover:bg-gray-500"
                    >
                      Disconnect Wallet
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={connectWallet}
                      className="font-bold border-2 bg-green-400 border-none hover:bg-green-500 px-3 py-1 rounded-full  "
                    >
                      Connect Wallet
                    </button>
                  </>
                )}
              {/* </Disclosure.Button> */}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
