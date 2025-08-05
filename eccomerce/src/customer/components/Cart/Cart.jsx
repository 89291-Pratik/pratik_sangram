import React, { useEffect } from 'react'
import CartItem from './CartItem'
import { Button, Divider } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { fetchCart } from '../../../store/slices/cartSlice'

const Cart = () => {
    const navigate=useNavigate()
    const { cart, cartItems, totalPrice, totalDiscountedPrice, discount, isLoading } = useAppSelector(state => state.cart)
    const dispatch = useAppDispatch()
    const handleCheckout=()=>{
        navigate("/checkout?step=2")
    }
    useEffect(()=>{
        dispatch(fetchCart())

    },[dispatch])

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
            </div>
        );
    }
  return (
    <div>
        <div className='lg:grid grid-cols-3 lg:px-16 relative'>
            <div className='col-span-2'>
            {cartItems?.map((item)=><CartItem key={item.id} item={item}/>)}

            </div>
            <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
            <div className='border'>
                <p className='uppercase font-bold opacity-60 pb-4'>Price details</p>
                <Divider/>
                <div className='space-y-3 font-semibold mb-10'>
                    <div className='flex justify-between pt-3 text-black'>
                        <span>Price</span>
                        <span>₹{totalPrice}</span>
                    </div>
                    <div className='flex justify-between pt-3 '>
                        <span>Discount</span>
                        <span className='text-green-600'>₹{discount}</span>
                    </div>
                    <div className='flex justify-between pt-3 '>
                        <span>Delivery Charges</span>
                        <span className='text-green-600'>Free</span>
                    </div>
                    <div className='flex justify-between pt-3  font-bold'>
                        <span>Total Amount</span>
                        <span className='text-green-600'>₹{totalDiscountedPrice}</span>
                    </div>

                </div>
                <Button onClick={handleCheckout} variant='contained' className="w-full mt-5" sx={{px:"2.5rem",py:"0.7rem", bgcolor:"#9155fd"}}>
                Checkout
              </Button>
            </div>

         </div>
        
         </div>
         
        
    </div>
  )
}

export default Cart