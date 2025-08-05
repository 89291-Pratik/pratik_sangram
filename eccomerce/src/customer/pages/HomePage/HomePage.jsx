import React from 'react'
import MainCarosel from '../../components/Navigation/HomeCarosel/MainCarosel'
import HomeSectionCarosel from '../../components/HomeSectionCarosel/HomeSectionCarosel'
import mens_kurta from '../../../Data/mens_kurta'

import Carousel from "../../components/Navigation/HomeCarosel/Carosel"


const HomePage = () => {
    return (
        <div className='bg-gray-50'>
         <MainCarosel/>

            <div className='space-y-16 py-20 flex flex-col justify-center px-5 lg:px-10'>
                <div className='bg-white rounded-lg shadow-sm p-6'>
                    <HomeSectionCarosel data={mens_kurta} sectionName={"Men's Kurta"}/>
                </div>
                <div className='bg-white rounded-lg shadow-sm p-6'>
                    <HomeSectionCarosel data={mens_kurta} sectionName={"Men's Shirt"}/>
                </div>
                <div className='bg-white rounded-lg shadow-sm p-6'>
                    <HomeSectionCarosel data={mens_kurta} sectionName={"Women's Kurti"}/>
                </div>
                <div className='bg-white rounded-lg shadow-sm p-6'>
                    <HomeSectionCarosel data={mens_kurta} sectionName={"Women's Lhenga"}/>
                </div>
               
            </div>
        </div>


    )
}

export default HomePage