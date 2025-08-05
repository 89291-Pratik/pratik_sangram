import { Button, IconButton } from '@mui/material'
import React from 'react'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { removeFromCart, updateCartItem, fetchCart } from '../../../store/slices/cartSlice';

const CartItem = ({item}) => {

     const dispatch=useDispatch()

    const dispatch = useAppDispatch()

    const handleUpdateCartItem=(num)=>{
        const data = { quantity: item.quantity + num };
        console.log(data)
        dispatch(updateCartItem({ cartItemId: item.id, data }))
            .then(() => dispatch(fetchCart()));

    }
    const handleRemoveCartItem=()=>{
        dispatch(removeFromCart(item.id))
            .then(() => dispatch(fetchCart()));
    }
  return (
    <div className='p-5 shadow-lg border rounded-md'>
        <div className='flex items-center'>
            <div className='w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]'>
                <img className="w-full h-full object-cover object-top"src={item.product.imageUrl} alt=""></img>

            </div>
            <div className='ml-5 space-y-1'>
                <p className='font-semibold'>{item.product.title}</p>
                <p className='opacity-70'>Size: {item.size},Black</p>
                <p className='opacity-70 mt-2'>Seller: {item.product.brand}</p>
                <div className="mt-4 lg:row-span-3 lg:mt-0">
           
            <div className='flex space-x-5 items-center  text-gray-900 pt-6'>
            <p className="font-semibold">₹{item.discountedPrice}</p>
            <p className='opacity-50 line-through'>₹{item.price}</p>
            <p className='text-green-600 font-semibold'>{item.product.discountPercent}% Off</p>
            </div>
            </div>
           

        </div>
       
    </div>
    <div className='lg:flex items-center lg:space-x-10 pt-4'>
                <div className='flex items-center space-x-2'>
                    <IconButton onClick={()=>handleUpdateCartItem(-1) } disabled={item.quantity<=1}>
                     <RemoveCircleOutlineIcon/>

                    </IconButton>
                    <span className='py-1 px-7 border rounded-sm'>{item.quantity}</span>
                    <IconButton onClick={()=>handleUpdateCartItem(1) } sx={{color:"RGB(145 85 253)"}}>
                     <AddCircleOutlineIcon/>

                    </IconButton>

                    

                </div>
                <div>
                    <Button onClick={handleRemoveCartItem}  sx={{color:"RGB(145 85 253)"}}>remove</Button>

                </div>

            </div>
    </div>
  )
}

export default CartItem