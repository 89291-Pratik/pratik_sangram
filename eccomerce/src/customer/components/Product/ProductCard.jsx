import React from 'react'
import "./ProductCard.css"
import { useNavigate } from 'react-router-dom';

const ProductCard = ({product}) => {
    const navigate=useNavigate();
  return (
    <div onClick={()=>navigate(`/product/${product.productId || product.id}`)} className='productCard w-[15rem] m-3 transition-all cursor-pointer hover:shadow-2xl transform hover:-translate-y-1'>
        <div className='h-[20rem]'>
            <img className="h-full w-full object-cover object-left-top" src={product.imageUrl}
            alt=''/>
        </div>
        <div className='textPart bg-white p-3 border-t'>
            <div>
                <p className='font-bold opacity-60 text-sm uppercase tracking-wide'>
                   {product.brand}
                </p>
                <p className='text-gray-900 font-medium mt-1 line-clamp-2'>
                   {product.title}
                </p>
            </div>
            <div className='flex item-center space-x-2 mt-2'>
                <p className='font-semibold text-lg text-gray-900'>₹{product.discountedPrice}</p>
               <p className='line-through opacity-50 text-sm'>₹{product.price}</p>
               <p className='text-green-600 font-semibold text-sm bg-green-100 px-2 py-1 rounded'>{product.discountPercent}% off</p>

            </div>

        </div>
    </div>
  )
}

export default ProductCard