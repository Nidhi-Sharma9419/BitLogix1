import React from "react";

export default function Footer() {
  return (
    <div className="h-auto bg-black text-white">
      <div className="flex flex-row flex-wrap py-9 font-medium font-Pantel">
        {/* WHole component */}
        <div className="flex flex-col md:w-[50%] items-center">
          {/* 1st row */}
          <div className="flex flex-col ml-12">
            {/* Connect with us */}
            <p className="text-white text-2xl">Connect with us :</p>
            <div className="flex flex-row space-x-2 mt-2">
              <a href="https://github.com/your-github">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              <a href="https://twitter.com/your-twitter">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/your-linkedin">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-mail"
                >
                  <path d="M22 6L12 13 2 6"></path>
                  <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
                </svg>
              </a>
            </div>
          </div>
          <div className="flex flex-col justify-start mt-10 -ml-12">
            <p className="text-2xl">View :</p>
            <span className="mt-2">
              <a href="/team" className="hover:text-sky-200">
                Our Team
              </a>
            </span>
            <span>
              <a href="/" className="hover:text-sky-200">
                ReadMe
              </a>
            </span>
          </div>
        </div>
        <div className="flex flex-col md:w-[50%] justify-center font-medium font-Pantel mt-10 md:mt-0 ml-12 md:ml-0 md:pl-16">
          <p className="text-3xl">Visit :</p>
          <span className="mt-7">
            <a href="" className="hover:text-sky-200 text-2xl">
              TronDAO Submisstion
            </a>
          </span>
          <span className="mt-3">
            <a href="" className="hover:text-sky-200 text-2xl">
              HackerEarth Submisstion
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
