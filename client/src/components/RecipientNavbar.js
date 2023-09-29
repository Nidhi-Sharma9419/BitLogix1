import React from "react";
import { Link } from "react-router-dom";

export default function EnterpriseNavbar() {
  return (
    <>
      <div>
        <div className="flex items-center justify-center gap-5 md:text-2xl font-bold">
          <button className="hover:underline">Account</button>
          <Link to="/claim">
            <button className="hover:underline">Claim</button>
          </Link>
          <Link to="/deliveries">
            <button className="hover:underline">Deliveries</button>
          </Link>
          <Link to="/checkrecipient">
            <button className="hover:underline">Check Balance</button>
          </Link>
        </div>
      </div>
    </>
  );
}
