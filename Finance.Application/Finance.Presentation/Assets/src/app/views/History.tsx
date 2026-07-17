import * as React from 'react'
import '../../styles/App.css';
import PositiveNegativeButton from '../../shared/components/PositiveNegativeButton'
import { CalendarIcon, MoneyIcon } from '../../shared/components/icons'
import InputFilter from '../../shared/components/InputFilter'
import GalleryItem from '../../shared/components/GalleryItem'
import VerticalGallery from '../../shared/components/VerticalGallery'
import { useTransactions, useGetTransactionsByUserId, usePostTransaction } from '../../shared/hooks/useTransactions';
import { useState, useEffect } from 'react';
import type { TransactionDto } from '../../shared/types/Transaction';


function History() {
  const [requestedTransactionByUserId, setRequestedTransactionByUserId] = useState<number | null>(2);
  const [fromDate, setFromDate] = useState<string>("2026-05-01T00:00:00.000Z");
  const [untilDate, setUntilDate] = useState<string>(new Date().toISOString());
  const { transactionsGetUserById, isLoadingGetUserById, errorGetUserById } = useGetTransactionsByUserId(requestedTransactionByUserId, fromDate, untilDate);
  
    return(
      <div className=' flex flex-1 flex-col w-full pr-4 '>
          <p className=' font-bold text-3xl'>History</p>
          <h4 className='text-xl'>Here you can check where you spend and gain your money from.</h4>
          <div className='max-h-[75%]'>
            <VerticalGallery separatorColor='#151734' backgroundColor='#0A0A20' header={
            <div className='flex flex-row w-full justify-between align-middle'> 
              <div className='flex flex-row  flex-1 gap-5 align-middle  px-2 py-5 h-full'>
                <InputFilter  placeholder='From' type='date' backgroundColor='#151734' icon={<CalendarIcon size={20} color='#848FD3'/>}/>
                <InputFilter  placeholder='From' type='date' backgroundColor='#151734' icon={<CalendarIcon size={20} color='#848FD3'/>}/>
              </div>
              <div className='flex flex-row flex-1 justify-end-safe gap-5  items-center '>
                <PositiveNegativeButton text='Filter by income' isCurrentlySelected={false} backgroundColor='#1E9326' hoveredBackgroundColor='#32A039' selectedBackgroundColor='#1A7E21' onClick={() => {console.log('hi')}}/>
                <PositiveNegativeButton text='Filter by outcome' isCurrentlySelected={false} backgroundColor='#CE311C' hoveredBackgroundColor='#f24822' selectedBackgroundColor='#1A7E21' onClick={() => {console.log('hi')}}/>
              </div>
            </div>
          } data={transactionsGetUserById ?? []} renderItem={(item: TransactionDto) => (
            <GalleryItem icon={<MoneyIcon size={35} color={item.category == 'Income' ? '#1E9326' : '#CE311C'}/>} title={item.category} description={item.description} 
            titleColor='#848FD3' descriptionColor='#848FD3' backgroundColor='#12142D' display={<div onClick={() => console.log(item)} className=' w-full h-full flex justify-center items-center'> 
            <p className='text-lg font-bold' style={{color:  item.category == 'Income' ? '#1E9326' : '#CE311C'}}>${item.amount}</p>
          </div>}/>
          )}/>
          </div>
          
        </div>
    )
}

export default History