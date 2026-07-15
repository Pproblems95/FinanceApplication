import * as React from 'react'
import PositiveNegativeButton from '../../shared/components/PositiveNegativeButton'
import { CalendarIcon, MoneyIcon } from '../../shared/components/icons'
import InputFilter from '../../shared/components/InputFilter'
import GalleryItem from '../../shared/components/GalleryItem'

function History() {
    return(
      <div>
        <h2>History</h2>
        <h4>Here you can check where you spend and gain your money from.</h4>
        <PositiveNegativeButton text='Filter by income' isCurrentlySelected={false} backgroundColor='#1E9326' hoveredBackgroundColor='#32A039' selectedBackgroundColor='#1A7E21' onClick={() => {console.log('hi')}}/>
        <PositiveNegativeButton text='Filter by outcome' isCurrentlySelected={false} backgroundColor='#CE311C' hoveredBackgroundColor='#f24822' selectedBackgroundColor='#1A7E21' onClick={() => {console.log('hi')}}/>
        
        <InputFilter  placeholder='From' type='date' backgroundColor='#151734' icon={<CalendarIcon size={20} color='#848FD3'/>}/>
        <GalleryItem icon={<MoneyIcon size={35} color='#1E9326'/>} title='Test' description='this is a test america fak yeah' 
        titleColor='#848FD3' descriptionColor='#848FD3' backgroundColor='#12142D' display={<div className=' w-full h-full flex justify-center items-center'> 
          <p  className='text-lg font-bold' style={{color:'#1E9326'}}>$2000</p>
        </div>}/>
      </div>
    )
}

export default History