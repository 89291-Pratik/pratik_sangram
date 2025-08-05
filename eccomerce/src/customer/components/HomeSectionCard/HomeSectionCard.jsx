// import React from 'react'

// const HomeSectionCard = ({product}) => {
//   return (
//     <div className='cursor-ponter  flex flex-col items-center bg-white rounded-lg shadow-lg oveerflow-hidden w-[15rem] mx-3 border '>
//     <div className='h-[13rem] w-[10rem]'>
//     <img className='object-cover object-top w-full h-full' src={product.imageUrl}
//     alt=""/>
//     </div>
//     <div className='p-4'>
//         <h3 className='text-lg font-medium text-gray-900'>{product.brand}</h3>
//         <p className='mt-2 text-sm text-gray-500'>{product.title}</p>
//     </div>
//     </div>
//   )
// }

// export default HomeSectionCard

import React from 'react';

const HomeSectionCard = ({ product }) => {
  return (

    <div className='cursor-pointer group transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl flex flex-col items-center bg-white rounded-lg shadow-md overflow-hidden w-[15rem] mx-3 border'>

      <div className='h-[13rem] w-[10rem] overflow-hidden'>
        <img
          className='object-cover object-top w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110'
          src={product.imageUrl}
          alt={product.title}
        />
      </div>

      <div className='p-4 text-center'>
        <h3 className='text-lg font-semibold text-gray-900'>{product.brand}</h3>
        <p className='mt-2 text-sm text-gray-600'>{product.title}</p>
      </div>


    <div className='cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3 border hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2'>
    <div className='h-[13rem] w-[10rem]'>
    <img className='object-cover object-top w-full h-full' src={product.imageUrl}
    alt=""/>
    </div>
    <div className='p-4 text-center'>
        <h3 className='text-lg font-medium text-gray-900 mb-1'>{product.brand}</h3>
        <p className='mt-2 text-sm text-gray-500 line-clamp-2'>{product.title}</p>
        <div className='mt-3 flex items-center justify-center space-x-2'>
            <span className='text-lg font-bold text-gray-900'>₹{product.discountedPrice}</span>
            <span className='text-sm text-gray-500 line-through'>₹{product.price}</span>
        </div>
    </div>

    </div>
  );
};

export default HomeSectionCard;
