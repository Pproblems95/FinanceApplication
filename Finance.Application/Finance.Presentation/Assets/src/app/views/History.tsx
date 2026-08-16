import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';

import PositiveNegativeButton from '../../shared/components/PositiveNegativeButton';
import { CalendarIcon, MoneyIcon } from '../../shared/components/icons';
import InputFilter from '../../shared/components/InputFilter';
import GalleryItem from '../../shared/components/GalleryItem';
import VerticalGallery from '../../shared/components/VerticalGallery';

import { useGetTransactionsByUserId } from '../../shared/hooks/useTransactions';
import type { TransactionDto } from '../../shared/types/Transaction';

import '../../styles/App.css';

function History() {
  const [requestedTransactionByUserId] = useState<number | null>(1);
  const [fromDate, setFromDate] = useState<string>('');
  const [untilDate, setUntilDate] = useState<string>('');
  const [nextCursorHandler, setNextCursorHandler] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<'Income' | 'Outcome' | null>(null);

  const [transactions, setTransactions] = useState<TransactionDto[]>([]);

  const {
    transactionsGetUserById,
    isLoadingGetUserById,
    hasNextPage,
    nextCursor,
  } = useGetTransactionsByUserId(
    requestedTransactionByUserId,
    8,
    fromDate,
    untilDate,
    nextCursorHandler
  );

  useEffect(() => {
    if (transactionsGetUserById && transactionsGetUserById.length > 0) {
      setTransactions((prev) => {
        if (!nextCursorHandler) {
          return transactionsGetUserById;
        }

        const existingIds = new Set(prev.map((item) => item.id));
        const newItems = transactionsGetUserById.filter((item) => !existingIds.has(item.id));
        return [...prev, ...newItems];
      });
    }
  }, [transactionsGetUserById, nextCursorHandler]);

  const handleFromDateChange = (data: string) => {
    setFromDate(data);
    setNextCursorHandler('');
    setTransactions([]);
  };

  const handleUntilDateChange = (data: string) => {
    setUntilDate(data);
    setNextCursorHandler('');
    setTransactions([]);
  };

  const handleToggleIncomeFilter = () => {
    setFilterCategory((prev) => (prev === 'Income' ? null : 'Income'));
  };

  const handleToggleOutcomeFilter = () => {
    setFilterCategory((prev) => (prev === 'Outcome' ? null : 'Outcome'));
  };

  const handleLoadMore = () => {
    if (hasNextPage && nextCursor && !isLoadingGetUserById) {
      setNextCursorHandler(nextCursor);
    }
  };

  const visibleTransactions = useMemo(() => {
    if (!filterCategory) return transactions;
    return transactions.filter((t) => t.category === filterCategory);
  }, [transactions, filterCategory]);

  return (
    <div className="flex flex-1 flex-col w-full pr-4">
      <p className="font-bold text-3xl">History</p>
      <h4 className="text-xl">Here you can check where you spend and gain your money from.</h4>

      <div className="max-h-[75%]">
        <VerticalGallery
          onLoadMore={handleLoadMore}
          isLoading={isLoadingGetUserById}
          hasNextPage={hasNextPage}
          separatorColor="#151734"
          backgroundColor="#0A0A20"
          data={visibleTransactions}
          header={
            <div className="flex flex-row w-full justify-between align-middle">
              <div className="flex flex-row flex-1 gap-5 align-middle px-2 py-5 h-full">
                <InputFilter
                  value={fromDate}
                  placeholder="From"
                  type="date"
                  backgroundColor="#151734"
                  onChange={handleFromDateChange}
                  icon={<CalendarIcon size={20} color="#848FD3" />}
                />
                <InputFilter
                  value={untilDate}
                  placeholder="Until"
                  type="date"
                  backgroundColor="#151734"
                  onChange={handleUntilDateChange}
                  icon={<CalendarIcon size={20} color="#848FD3" />}
                />
              </div>

              <div className="flex flex-row flex-1 justify-end-safe gap-5 items-center">
                <PositiveNegativeButton
                  text="Filter by income"
                  isCurrentlySelected={filterCategory === 'Income'}
                  backgroundColor="#1E9326"
                  hoveredBackgroundColor="#32A039"
                  selectedBackgroundColor="#15691b"
                  onClick={handleToggleIncomeFilter}
                />
                <PositiveNegativeButton
                  text="Filter by outcome"
                  isCurrentlySelected={filterCategory === 'Outcome'}
                  backgroundColor="#CE311C"
                  hoveredBackgroundColor="#f24822"
                  selectedBackgroundColor="#B32917"
                  onClick={handleToggleOutcomeFilter}
                />
              </div>
            </div>
          }
          renderItem={(item: TransactionDto) => (
            <GalleryItem
              key={item.id}
              icon={
                <MoneyIcon
                  size={35}
                  color={item.category === 'Income' ? '#1E9326' : '#CE311C'}
                />
              }
              title={item.category}
              description={item.description}
              titleColor="#848FD3"
              descriptionColor="#848FD3"
              backgroundColor="#12142D"
              display={
                <div
                  onClick={() => console.log(item)}
                  className="w-full h-full flex justify-center items-center"
                >
                  <p
                    className="text-lg font-bold"
                    style={{
                      color: item.category === 'Income' ? '#1E9326' : '#CE311C',
                    }}
                  >
                    ${item.amount}
                  </p>
                </div>
              }
            />
          )}
        />
      </div>
    </div>
  );
}

export default History;