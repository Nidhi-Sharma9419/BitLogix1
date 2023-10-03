import React from "react";
import { Oval } from "react-loader-spinner";

export default function Loader() {
  return (
    <div>
      <div className="flex justify-center items-center lg:min-h-[85vh] min-h-[90vw]">
        <Oval
          height="80"
          width="80"
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    </div>
  );
}
