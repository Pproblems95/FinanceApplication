import VerticalGallery from '../../shared/components/VerticalGallery'
import Calendar from '../../shared/components/Calendar'
import InfoCard from '../../shared/components/InfoCard'
import { PlusIcon, BriefcaseIcon, MoneyIcon, EditIcon, DeleteIcon } from '../../shared/components/icons'
import { useAccumulatedTransactionsByType } from '../../shared/hooks/useTransactions'
import type { TransactionDto } from '../../shared/types/Transaction'
import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const INCOME_CATEGORY = 'Income';
const OUTCOME_CATEGORY = 'Outcome';

const INCOME_TAB = 'income';
const OUTCOME_TAB = 'outcome';

const CONSTANT_TRANSACTION_TYPE = 0;

// Maximo permitido por el backend, para que el mes cargue completo en una sola peticion.
const PAGE_SIZE = 50;

const INCOME_COLOR = '#41DB40';
const OUTCOME_COLOR = '#CE311C';

const PANEL_COLOR = '#1A0B2E';
const TAB_ACTIVE_COLOR = '#3B1A66';
const ITEM_COLOR = '#24133D';
const ITEM_SELECTED_COLOR = '#5B2A9E';
const ICON_COLOR = '#FFFFFF';
const SUBTITLE_COLOR = '#A9A3C2';
const SEPARATOR_COLOR = '#2A1747';

const RIGHT_PANEL_COLOR = '#14081F';
const CALENDAR_COLOR = '#191A2E';
const CALENDAR_HEADER_COLOR = '#24253A';
const DAY_COLOR = '#24253A';
const OUTSIDE_DAY_COLOR = '#141414';
const DAY_NUMBER_COLOR = '#5A5C8A';
const CARD_COLOR = '#24253A';
const PLACEHOLDER_COLOR = '#9A9A9A';

const pad = (value: number) => value.toString().padStart(2, '0');

const toDateKey = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

// Se usa la parte YYYY-MM-DD del string para que la zona horaria no recorra el dia.
const transactionDateKey = (transaction: TransactionDto) => transaction.date.slice(0, 10);

const formatDate = (date: string) => {
  const [year, month, day] = date.slice(0, 10).split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
};

const formatAmount = (amount: number, isOutcome: boolean) => {
  const parsedAmount = amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return isOutcome ? `- $ ${parsedAmount}` : `$ ${parsedAmount}`;
};

const getMonthRange = (month: Date) => {
  const year = month.getFullYear();
  const monthNumber = month.getMonth() + 1;
  const lastDay = new Date(year, monthNumber, 0).getDate();

  return {
    fromDate: `${year}-${pad(monthNumber)}-01`,
    // El backend compara Date <= untilDate, por eso se incluye el final del dia.
    untilDate: `${year}-${pad(monthNumber)}-${pad(lastDay)}T23:59:59`
  };
};

interface RegistryMonthViewProps {
  month: Date,
  onPreviousMonth: () => void,
  onNextMonth: () => void
}

function RegistryMonthView({ month, onPreviousMonth, onNextMonth }: RegistryMonthViewProps) {
  const [requestedTransactionByUserId] = useState<number | null>(1);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionDto | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedTab = searchParams.get('tab') === OUTCOME_TAB ? OUTCOME_TAB : INCOME_TAB;
  const isIncomeTab = selectedTab === INCOME_TAB;

  const { fromDate, untilDate } = useMemo(() => getMonthRange(month), [month]);

  const income = useAccumulatedTransactionsByType(requestedTransactionByUserId, PAGE_SIZE, null, INCOME_CATEGORY, fromDate, untilDate);
  const outcome = useAccumulatedTransactionsByType(requestedTransactionByUserId, PAGE_SIZE, null, OUTCOME_CATEGORY, fromDate, untilDate);
  const active = isIncomeTab ? income : outcome;

  const transactionsByDay = useMemo(() => {
    const days = new Map<string, { hasIncome: boolean, hasOutcome: boolean }>();
    const mark = (transactions: TransactionDto[], isIncome: boolean) => {
      transactions.forEach((transaction) => {
        const key = transactionDateKey(transaction);
        const day = days.get(key) ?? { hasIncome: false, hasOutcome: false };
        if (isIncome)
          day.hasIncome = true;
        else
          day.hasOutcome = true;
        days.set(key, day);
      });
    };

    mark(income.transactions, true);
    mark(outcome.transactions, false);
    return days;
  }, [income.transactions, outcome.transactions]);

  const monthTotal = active.transactions.reduce((total, transaction) => total + transaction.amount, 0);

  const selectTab = (tab: string) => {
    setSearchParams({ tab });
    setSelectedTransaction(null);
  };

  const renderTab = (tab: string, label: string) => (
    <button
      type='button'
      onClick={() => selectTab(tab)}
      className='flex-1 py-2 hover:cursor-pointer'
      style={{ background: selectedTab === tab ? TAB_ACTIVE_COLOR : 'transparent' }}
    >
      {label}
    </button>
  );

  const renderTransactionItem = (item: TransactionDto) => (
    <div
      className='flex flex-row items-center gap-3 rounded-md px-3 py-2 hover:cursor-pointer'
      style={{ background: selectedTransaction?.id === item.id ? ITEM_SELECTED_COLOR : ITEM_COLOR }}
      onClick={() => setSelectedTransaction(item)}
    >
      <BriefcaseIcon size={14} color={ICON_COLOR} className='shrink-0' />
      <div className='flex flex-col min-w-0'>
        <span className='text-sm truncate'>{item.description}</span>
        <span className='text-xs truncate' style={{ color: SUBTITLE_COLOR }}>{formatDate(item.date)}</span>
      </div>
    </div>
  );

  const renderDayContent = (date: Date, isCurrentMonth: boolean) => {
    const day = isCurrentMonth ? transactionsByDay.get(toDateKey(date)) : undefined;
    if (!day)
      return null;

    return (
      <div className='flex flex-row gap-1'>
        {day.hasIncome && <MoneyIcon size={26} color={INCOME_COLOR} />}
        {day.hasOutcome && <MoneyIcon size={26} color={OUTCOME_COLOR} />}
      </div>
    );
  };

  const getDayNumberColor = (date: Date, isCurrentMonth: boolean) => {
    const day = isCurrentMonth ? transactionsByDay.get(toDateKey(date)) : undefined;
    if (!day || day.hasIncome === day.hasOutcome)
      return undefined;

    return day.hasIncome ? INCOME_COLOR : OUTCOME_COLOR;
  };

  const isSelectedOutcome = selectedTransaction?.category === OUTCOME_CATEGORY;
  const selectedColor = isSelectedOutcome ? OUTCOME_COLOR : INCOME_COLOR;

  return (
    <div className='flex flex-row flex-1 gap-4 min-h-0'>
      <div className='flex flex-col w-64 shrink-0 min-h-[80vh] rounded-lg overflow-hidden' style={{ background: PANEL_COLOR }}>
        <div className='flex flex-1 min-h-0'>
          <VerticalGallery<TransactionDto>
            backgroundColor={PANEL_COLOR}
            separatorColor={SEPARATOR_COLOR}
            data={active.transactions}
            header={
              <div className='flex flex-row -mx-5 -mt-5'>
                {renderTab(INCOME_TAB, 'Income')}
                {renderTab(OUTCOME_TAB, 'Outcome')}
              </div>
            }
            renderItem={renderTransactionItem}
            emptyMessage={isIncomeTab ? 'No tienes ingresos registrados este mes' : 'No tienes gastos registrados este mes'}
            isLoading={active.isLoading}
            hasNextPage={active.hasNextPage}
            onLoadMore={active.loadMore}
            maxHeight='60vh'
          />
        </div>

        <div className='p-4'>
          <button
            type='button'
            onClick={() => {}}
            className='w-full flex flex-row items-center justify-center gap-3 rounded-md py-3 text-sm hover:cursor-pointer'
            style={{ background: ITEM_COLOR }}
          >
            <PlusIcon size={16} />
            <span>Add a new <b>{isIncomeTab ? 'income' : 'outcome'}</b> source</span>
          </button>
        </div>
      </div>

      <div className='flex flex-col flex-1 min-w-0 gap-4 p-4 rounded-lg border border-[#40404d]' style={{ background: RIGHT_PANEL_COLOR }}>
        <Calendar
          month={month}
          onPreviousMonth={onPreviousMonth}
          onNextMonth={onNextMonth}
          renderDayContent={renderDayContent}
          getDayNumberColor={getDayNumberColor}
          backgroundColor={CALENDAR_COLOR}
          headerColor={CALENDAR_HEADER_COLOR}
          dayColor={DAY_COLOR}
          outsideDayColor={OUTSIDE_DAY_COLOR}
          dayNumberColor={DAY_NUMBER_COLOR}
        />

        <div className='flex flex-row gap-4'>
          <div className='flex-[2] min-w-0'>
            {selectedTransaction ? (
              <InfoCard
                icon={<BriefcaseIcon size={40} color={ICON_COLOR} />}
                title={selectedTransaction.description}
                description={formatDate(selectedTransaction.date)}
                subtitle={selectedTransaction.transactionType === CONSTANT_TRANSACTION_TYPE ? 'Constant' : 'Variable'}
                actions={
                  <>
                    <EditIcon size={22} className='hover:cursor-pointer' onClick={() => {}} />
                    <DeleteIcon size={22} className='hover:cursor-pointer' onClick={() => {}} />
                  </>
                }
                backgroundColor={CARD_COLOR}
                titleColor='#FFFFFF'
                descriptionColor={SUBTITLE_COLOR}
              />
            ) : (
              <div className='flex items-center justify-center h-full rounded-lg px-6 py-8 text-xl text-center' style={{ background: CARD_COLOR }}>
                <p>Select an <b>Income</b>/<b>Outcome</b> source to edit</p>
              </div>
            )}
          </div>

          <div className='flex-1 min-w-0 flex flex-col justify-center rounded-lg px-4 py-3' style={{ background: CARD_COLOR }}>
            {selectedTransaction ? (
              <div className='flex flex-row items-center justify-center gap-3'>
                <MoneyIcon size={32} color={selectedColor} className='shrink-0' />
                <p className='text-3xl font-bold truncate' style={{ color: selectedColor }}>
                  {formatAmount(selectedTransaction.amount, isSelectedOutcome)}
                </p>
              </div>
            ) : (
              <p className='text-5xl font-bold text-center' style={{ color: PLACEHOLDER_COLOR }}>000000</p>
            )}
            <div className='flex flex-row justify-between mt-2 text-sm'>
              <span style={{ color: SUBTITLE_COLOR }}>Total del mes:</span>
              <span className='font-bold' style={{ color: isIncomeTab ? INCOME_COLOR : OUTCOME_COLOR }}>
                {formatAmount(monthTotal, !isIncomeTab)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RegistryOptions() {
  const navigate = useNavigate();
  const [visibleMonth, setVisibleMonth] = useState<Date>(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const description = 'Keep track of your Income and Outcome by registering new records and keeping track of Income & Outcome sources';

  const shiftMonth = (offset: number) =>
    setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1));

  return (
    <div className='flex flex-1 flex-col w-full h-full gap-6 pr-4'>
      <div>
        <p className='font-bold text-xl'>
          <span className='hover:cursor-pointer hover:underline' onClick={() => navigate('/home/transactionregistry')}>
            Income/Outcome Registry /
          </span>
          <span className='ml-6'>Constant Income/Outcome Registration Page</span>
        </p>
        <h4 className='text-md' style={{ color: SUBTITLE_COLOR }}>{description}</h4>
      </div>

      {/* Se remonta por mes para que la paginacion empiece limpia en cada mes */}
      <RegistryMonthView
        key={toDateKey(visibleMonth)}
        month={visibleMonth}
        onPreviousMonth={() => shiftMonth(-1)}
        onNextMonth={() => shiftMonth(1)}
      />
    </div>
  )
}

export default RegistryOptions
