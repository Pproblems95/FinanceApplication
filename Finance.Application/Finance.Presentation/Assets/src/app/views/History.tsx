import * as React from 'react'
import PositiveNegativeButton from '../../shared/components/PositiveNegativeButton'
import { CalendarIcon, MoneyIcon } from '../../shared/components/icons'
import InputFilter from '../../shared/components/InputFilter'
import GalleryItem from '../../shared/components/GalleryItem'
import VerticalGallery from '../../shared/components/VerticalGallery'
import { useTransactions, useGetTransactionsByUserId, usePostTransaction } from '../../shared/hooks/useTransactions';
import { useState, useEffect } from 'react';
import type { TransactionDto } from '../../shared/types/Transaction';


function History() {
  const [requestedTransactionByUserId, setRequestedTransactionByUserId] = useState<number | null>(1);
  const [fromDate, setFromDate] = useState<string>("2026-05-01T00:00:00.000Z");
  const [untilDate, setUntilDate] = useState<string>(new Date().toISOString());
  const { transactionsGetUserById, isLoadingGetUserById, errorGetUserById } = useGetTransactionsByUserId(requestedTransactionByUserId, fromDate, untilDate);
  
    return(
      <div>
        <h2>History</h2>
        <h4>Here you can check where you spend and gain your money from.</h4>
        <div style={{ border: '1px solid white', padding: '10px' }}>
          <input 
            placeholder='User ID' 
            type='number' 
            className=' bg-black text-white'  
            value={requestedTransactionByUserId ?? ''} 
            onChange={(e) => {setRequestedTransactionByUserId(Number(e.target.value))}}
          />
          <button onClick={() => {console.log('hook nuevo', transactionsGetUserById, isLoadingGetUserById, errorGetUserById)}}>
            Consultar Usuario
          </button>
        </div>
       
        
        <VerticalGallery backgroundColor='#0A0A20' header={
          <div className='flex flex-row w-full'> 
            <div className='flex flex-row w-full'>
              <InputFilter  placeholder='From' type='date' backgroundColor='#151734' icon={<CalendarIcon size={20} color='#848FD3'/>}/>
              <InputFilter  placeholder='From' type='date' backgroundColor='#151734' icon={<CalendarIcon size={20} color='#848FD3'/>}/>
            </div>
            <div className='flex flex-row w-full'>
              <PositiveNegativeButton text='Filter by income' isCurrentlySelected={false} backgroundColor='#1E9326' hoveredBackgroundColor='#32A039' selectedBackgroundColor='#1A7E21' onClick={() => {console.log('hi')}}/>
              <PositiveNegativeButton text='Filter by outcome' isCurrentlySelected={false} backgroundColor='#CE311C' hoveredBackgroundColor='#f24822' selectedBackgroundColor='#1A7E21' onClick={() => {console.log('hi')}}/>
            </div>
          </div>
        } data={transactionsGetUserById ?? []} renderItem={(item: TransactionDto) => (
          <GalleryItem icon={<MoneyIcon size={35} color='#1E9326'/>} title={item.category} description={item.description} 
          titleColor='#848FD3' descriptionColor='#848FD3' backgroundColor='#12142D' display={<div onClick={() => console.log(item)} className=' w-full h-full flex justify-center items-center'> 
          <p  className='text-lg font-bold' style={{color:'#1E9326'}}>${item.amount}</p>
        </div>}/>
        )}/>
      </div>
    )
}

export default History