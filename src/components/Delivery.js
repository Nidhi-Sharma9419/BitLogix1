import React from 'react'
import Navbar from './Navbar';

export default function Delivery() {
  return (
    <>
    <Navbar/>
      <div className='flex flex-wrap justify-center lg:justify-evenly items-center lg:min-h-[100vh] min-h-[80vh]'>
        <img src={"/landing.png"} alt='product-img' className='lg:w-[50rem] lg:h-[30rem] w-[10rem] h-[10rem]' />
        <div>
          <div className='flex flex-wrap justify-between items-center text-center'>
            <div className='block w-full md:w-auto'>
              <p className='font-bold text-2xl'>Pickup Place</p>
              <p className='font-semibold text-md'>Bangalore,50004</p>
            </div>
            <i className="text-[2rem] fa-solid fa-arrow-right block text-center w-full md:w-auto"></i>
            <div className='block w-full md:w-auto'>
              <p className='font-bold text-2xl'>Destination Place</p>
              <p className='font-semibold text-md'>Delhi,458782</p>
            </div>
          </div>
          <div className='flex flex-wrap flex-col justify-center mt-12 gap-2 mx-12 md:mx-0'>
            <button className=' p-2 bg-indigo-500 rounded-lg text-white text-2xl font-bold'>In-Transit</button>
            <p className='font-semibold text-2xl'>Your product will be delivered in 8 days</p>
          </div>
        </div>
      </div>
    </>
  );
}
