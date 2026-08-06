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
  const [requestedTransactionByUserId, setRequestedTransactionByUserId] = useState<number | null>(1);
  const [fromDate, setFromDate] = useState<string>('');
  const [untilDate, setUntilDate] = useState<string>('');
  const [positiveButtonCurrentlySelected, setPositiveButtonCurrentlySelected] = useState<boolean>(false);
  const [negativeButtonCurrentlySelected, setNegativeButtonCurrentlySelected] = useState<boolean>(false);
  const [filteredList, setFilteredList] = useState<TransactionDto[]| null>([]);
  const [dataToFeedList, setDataToFeedList] = useState<TransactionDto[] | null>([]);

  const { transactionsGetUserById, isLoadingGetUserById, errorGetUserById } = useGetTransactionsByUserId(requestedTransactionByUserId, 10, fromDate, untilDate, '');
  
  useEffect(() => {
    if(transactionsGetUserById)
      setDataToFeedList(transactionsGetUserById);
  }, [transactionsGetUserById])

  useEffect(() => {
    
    console.log('data',dataToFeedList)
  }, [dataToFeedList])

  const handleFromInputData = (data: string) => {
    setFromDate(data);
  }

  const handleUntilInputData = (data: string) => {
    setUntilDate(data);
  }

  const handleOnClickPositiveButton = (): void => {
    if(positiveButtonCurrentlySelected){
      setPositiveButtonCurrentlySelected(false);
      setDataToFeedList(transactionsGetUserById);
      
    } 
    else{
      setPositiveButtonCurrentlySelected(true);
      const filteredArray: TransactionDto[] | null = (transactionsGetUserById?.filter(t => t.category === "Income")) ?? null;
      setDataToFeedList(filteredArray);
    }
  } 

  const handleOnClickNegativeButton = (): void => {
    if(negativeButtonCurrentlySelected){
      setNegativeButtonCurrentlySelected(false);
      setDataToFeedList(transactionsGetUserById);
    }
    else {
      setNegativeButtonCurrentlySelected(true);
      const filteredArray: TransactionDto[] | null = (transactionsGetUserById?.filter(t => t.category === "Outcome")) ?? null;
      setDataToFeedList(filteredArray);
    }
  } 

    return(
      <div className=' flex flex-1 flex-col w-full pr-4 '>
          <p className=' font-bold text-3xl'>History</p>
          <h4 className='text-xl'>Here you can check where you spend and gain your money from.</h4>
          <div className='max-h-[75%]'>
            <VerticalGallery scrollHandler={() => {}} separatorColor='#151734' backgroundColor='#0A0A20' header={
            <div className='flex flex-row w-full justify-between align-middle'> 
              <div className='flex flex-row  flex-1 gap-5 align-middle  px-2 py-5 h-full'>
                <InputFilter value={fromDate} placeholder='From' type='date' backgroundColor='#151734' onChange={handleFromInputData} icon={<CalendarIcon size={20} color='#848FD3'/>}/>
                <InputFilter value={untilDate} placeholder='From' type='date' backgroundColor='#151734' onChange={handleUntilInputData} icon={<CalendarIcon size={20} color='#848FD3'/>}/>
              </div>
              <div className='flex flex-row flex-1 justify-end-safe gap-5  items-center '>
                <PositiveNegativeButton text='Filter by income' isCurrentlySelected={positiveButtonCurrentlySelected} backgroundColor='#1E9326' hoveredBackgroundColor='#32A039' selectedBackgroundColor='#15691b' onClick={handleOnClickPositiveButton}/>
                <PositiveNegativeButton text='Filter by outcome' isCurrentlySelected={negativeButtonCurrentlySelected} backgroundColor='#CE311C' hoveredBackgroundColor='#f24822' selectedBackgroundColor='#B32917' onClick={handleOnClickNegativeButton}/>
              </div>
            </div>
          } data={dataToFeedList ?? []} renderItem={(item: TransactionDto) => (
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