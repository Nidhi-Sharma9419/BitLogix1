import React from "react";

export default function QualityRec() {
  return (
    <div>
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <div class="px-4 sm:px-0">
            <h3 class="text-lg font-semibold leading-6 text-gray-900 mt-5 md:mt-5 md:ml-5 font-Pantel">
              Contact Me
            </h3>
            <p class="text-gray-600 md:mt-5 md:ml-5">
              This information will be displayed to the Enterprise for Business
              Purposes
            </p>
          </div>
        </div>
        <div class="mt-12 md:mt-10 md:col-span-2 border-2 border-gray-900 md:w-[80%] rounded-lg mx-2">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div class="grid grid-cols-3 gap-6">
                <div class="col-span-3 sm:col-span-2">
                  <label
                    for="email"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      name="email"
                      id="email"
                      class="py-3 px-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                      placeholder="john@bitlogix.com"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  for="phone"
                  class="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <div class="mt-1">
                  <input
                    id="phone"
                    name="phone"
                    rows="3"
                    class="py-3 px-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="+1 846 847 8387"
                  ></input>
                </div>
              </div>
              <div>
                <label
                  for="phone"
                  class="block text-sm font-medium text-gray-700"
                >
                  Other
                </label>
                <div class="mt-1">
                  <input
                    id="link"
                    name="link"
                    rows="3"
                    class="py-3 px-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="https://www.twitter.com/john_bitlogix"
                  ></input>
                </div>
              </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
