import React from 'react'
import AddressCards from '../AddressCards/AddressCards'
import OrderTracker from './OrderTracker'
import { Box, Grid } from '@mui/material'
import { deepPurple } from '@mui/material/colors'
import StarBorderIcon from '@mui/icons-material/StarBorder';   


const OrderDetails = () => {
  return (
    <div className='px:5 lg:px-20'>
        <div>
            <h1 className='font-bold text-xl py-7'>Delivery Address</h1>
            <AddressCards/>
            </div>
            <div className='py-20'>
                <OrderTracker activeStep={3}/>
            </div>
            <Grid container className="space-y-5">
                {[1,1,1,1,1].map((item)=> <Grid item container className="shadow-xl ronded-md p-5 border" sx={{alignItems:"center",justifyContent:'space-between'}} >
                    <Grid item xs={6}>
                        <div className='flex items-center space-x-4'>
                            <img className='w-[5rem] h-[5rem] object-cover object-top' src="https://www.libas.in/cdn/shop/files/8404MJ.jpg?v=1713522661" alt=""/>
                            <div className='space-y-2 ml-5'>
                                <p className='font-semibold'>Black Embroidered Ethnic Dress</p>
                                <p><span className='space-x-5 opacity-50 text-xs font-semibold'>Color : black</span><span> Size : M</span></p>
                                <p>Seller: linaria</p>
                                <p>₹1099</p>
                            </div>
                        </div>
                    </Grid>
                    <Grid item>
                        <Box sx={{color:deepPurple[500]}}>
                         <StarBorderIcon sx={{fontSize:"2rem"}} className='px-2'/>
                         <span>Rate & Review Product</span>

                        </Box>

                        </Grid>
                        </Grid>)}
               
                        </Grid>
    </div>
  )
}

export default OrderDetails