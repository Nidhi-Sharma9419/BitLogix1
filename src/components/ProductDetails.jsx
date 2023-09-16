import React,{useState} from 'react'

export default function ProductDetails() {
    const [isloading, setIsLoading] = useState(false);

    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();
    const [pickupPlace, setPickupPlace] = useState();
    const [destinationPlace, setDestinationPlace] = useState();
    const [recipientAddress, setRecipientAddress] = useState();

    const handleSubmit = () => {
        console.log({name,price,quantity,pickupPlace,destinationPlace,recipientAddress})
    }

    return (
      <>
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
              <div>
                <span className="relative mt-6 lg:bottom-3 font-Pantel text-4xl text-[#39FF14] tracking-wider font-medium underline block text-center">ENTERPRISE</span>
                <label className="block text-gray-700 mt-10">Name</label>
                <input
                  type="text"
                  name="name"
                  id=""
                  placeholder="John Mortis"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  onChange={(e)=>setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Details of Business</label>
                <input
                  type="text"
                  name="number"
                  id=""
                  placeholder="40$"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  onChange={(e)=>setPrice(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Quanity</label>
                <input
                  type="number"
                  name="name"
                  id=""
                  placeholder="40 KG"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  onChange={(e)=>setQuantity(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">PickUp Address</label>
                <input
                  type="text"
                  name="name"
                  id=""
                  placeholder="5331 Rexford Court, Montgomery AL 36116"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  onChange={(e)=>setPickupPlace(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Destination Address</label>
                <input
                  type="text"
                  name="name"
                  id=""
                  placeholder="6095 Terry Lane, Golden CO 80403"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  onChange={(e)=>setDestinationPlace(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Recipient Address</label>
                <input
                  type="text"
                  name="name"
                  id=""
                  placeholder="0x63c6770FEb4dcc984c71Ce7Df2928ED400027aC9"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  onChange={(e)=>setRecipientAddress(e.target.value)}
                  required
                />
              </div>
              {isloading ? (
                <>
                  <button
                    disabled
                    type="submit"
                    className="cursor-progress w-full block bg-gray-500  text-white font-semibold rounded-lg
                    px-4 py-3 mt-6"
                  >
                    Almost Done...
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="submit"
                    className="w-full block bg-green-500 hover:bg-green-400  text-white font-semibold rounded-lg
                    px-4 py-3 mt-6"
                    onClick={() => handleSubmit()}
                  >
                    Proceed to Deliver
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
}
