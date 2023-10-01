import React from "react";
import { Link } from "react-router-dom";

export default function EnterpriseNavbar() {
  return (
    <>
      <div>
        <div className="flex items-center justify-center gap-5 md:text-2xl font-bold">
          <button className="hover:underline">Account</button>
          <Link to="/claiment">
            <button className="hover:underline">Claim</button>
          </Link>
          <Link to="/products">
            <button className="hover:underline">Products</button>
          </Link>
          <Link to="/checkenterprise">
            <button className="hover:underline">Check Balance</button>
          </Link>
          <Link to="/qualityenterprise">
            <button className="hover:underline">Quality Assurance</button>
          </Link>
        </div>
      </div>
    </>
  );
}
