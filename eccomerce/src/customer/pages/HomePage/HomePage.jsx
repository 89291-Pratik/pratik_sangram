import React from 'react'
import MainCarosel from '../../components/Navigation/HomeCarosel/MainCarosel'
import HomeSectionCarosel from '../../components/HomeSectionCarosel/HomeSectionCarosel'
import mens_kurta from '../../../Data/mens_kurta'


const HomePage = () => {
    return (
        <div>
         <MainCarosel/>

            <div className='space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10'>
                <HomeSectionCarosel data={mens_kurta} sectionName={"Men's Kurta"}/>
                <HomeSectionCarosel data={mens_kurta} sectionName={"Men's Shirt"}/>
                <HomeSectionCarosel data={mens_kurta} sectionName={"Women's Kurti"}/>
                <HomeSectionCarosel data={mens_kurta} sectionName={"Women's Lhenga"}/>
                <HomeSectionCarosel data={mens_kurta}/>
               
            </div>
        </div>


    )
}

export default HomePage