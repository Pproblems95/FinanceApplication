import TransactionSources from '../../shared/components/TransactionSources'
import GalleryItem from '../../shared/components/GalleryItem'
import { PlusIcon, MoneyIcon } from '../../shared/components/icons'
import { useAccumulatedTransactionsByType } from '../../shared/hooks/useTransactions'
import type { TransactionDto } from '../../shared/types/Transaction'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CONSTANT_TRANSACTION_TYPE = 0;
const VARIABLE_TRANSACTION_TYPE = 1;

const INCOME_CATEGORY = 'Income';
const OUTCOME_CATEGORY = 'Outcome';

const PAGE_SIZE = 8;

const ICON_COLOR = '#848FD3';
const INCOME_COLOR = '#41DB40';
const OUTCOME_COLOR = '#CE311C';

const formatAmount = (amount: number, isOutcome: boolean) => {
  const parsedAmount = amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return isOutcome ? `- $ ${parsedAmount}` : `$ ${parsedAmount}`;
};

function TransactionRegistry() {
  const [requestedTransactionByUserId] = useState<number | null>(1);
  const navigate = useNavigate();

  const constantIncome = useAccumulatedTransactionsByType(requestedTransactionByUserId, PAGE_SIZE, CONSTANT_TRANSACTION_TYPE, INCOME_CATEGORY);
  const variableIncome = useAccumulatedTransactionsByType(requestedTransactionByUserId, PAGE_SIZE, VARIABLE_TRANSACTION_TYPE, INCOME_CATEGORY);
  const constantOutcome = useAccumulatedTransactionsByType(requestedTransactionByUserId, PAGE_SIZE, CONSTANT_TRANSACTION_TYPE, OUTCOME_CATEGORY);
  const variableOutcome = useAccumulatedTransactionsByType(requestedTransactionByUserId, PAGE_SIZE, VARIABLE_TRANSACTION_TYPE, OUTCOME_CATEGORY);

  const description = 'Keep track of your Income and Outcome by registering new records and keeping track of Income & Outcome sources';

  const renderTransactionItem = (item: TransactionDto) => {
    const isOutcome = item.category === OUTCOME_CATEGORY;

    return (
      <GalleryItem
        key={item.id}
        icon={<MoneyIcon size={28} color={ICON_COLOR} />}
        title={item.category}
        description={item.description}
        titleColor='#FFFFFF'
        descriptionColor='#848FD3'
        backgroundColor='#12142D'
        display={
          <div className='w-full h-full flex justify-center items-center'>
            <p className='text-lg font-bold' style={{ color: isOutcome ? OUTCOME_COLOR : INCOME_COLOR }}>
              {formatAmount(item.amount, isOutcome)}
            </p>
          </div>
        }
      />
    );
  };

  return (
    <div className='flex flex-1 flex-col w-full gap-8 pr-4'>
      <div>
        <p className='font-bold text-3xl'>Finance Record Registry</p>
        <h4 className='text-xl'>{description}</h4>
      </div>

      <TransactionSources<TransactionDto, TransactionDto>
        highlightColor={INCOME_COLOR}
        title='Income sources'
        description='Register sources that provide you with constant money'
        backgroundColor='#0A0A20'
        galleryBackgroundColor='#0F1130'
        gallerySeparatorColor='#151734'
        galleryTitleColor='#848FD3'
        leftGalleryTitle='Constant Revenue Sources'
        leftItems={constantIncome.transactions}
        renderLeftItem={renderTransactionItem}
        leftEmptyMessage='Todavia no has registrado fuentes de ingreso constantes'
        isLoadingLeft={constantIncome.isLoading}
        hasNextPageLeft={constantIncome.hasNextPage}
        onLoadMoreLeft={constantIncome.loadMore}
        rightGalleryTitle='Variable Revenue Registrations'
        rightItems={variableIncome.transactions}
        renderRightItem={renderTransactionItem}
        rightEmptyMessage='Todavia no has registrado ingresos variables'
        isLoadingRight={variableIncome.isLoading}
        hasNextPageRight={variableIncome.hasNextPage}
        onLoadMoreRight={variableIncome.loadMore}
        buttonIcon={<PlusIcon size={20} />}
        buttonName='Add New Income'
        buttonIsCurrentlySelected={false}
        buttonCustomColor={INCOME_COLOR}
        buttonCustomHoveredColor='#6EBA6A'
        buttonOnClick={() => navigate('/home/transactionregistry/registryoptions?tab=income')}
      />

      <TransactionSources<TransactionDto, TransactionDto>
        highlightColor={OUTCOME_COLOR}
        title='Outcome sources'
        description='Register sources that provide you with constant money'
        backgroundColor='#0A0A20'
        galleryBackgroundColor='#0F1130'
        gallerySeparatorColor='#151734'
        galleryTitleColor='#848FD3'
        leftGalleryTitle='Constant Expenses Sources'
        leftItems={constantOutcome.transactions}
        renderLeftItem={renderTransactionItem}
        leftEmptyMessage='Todavia no has registrado gastos constantes'
        isLoadingLeft={constantOutcome.isLoading}
        hasNextPageLeft={constantOutcome.hasNextPage}
        onLoadMoreLeft={constantOutcome.loadMore}
        rightGalleryTitle='Variable Expense Registrations'
        rightItems={variableOutcome.transactions}
        renderRightItem={renderTransactionItem}
        rightEmptyMessage='Todavia no has registrado gastos variables'
        isLoadingRight={variableOutcome.isLoading}
        hasNextPageRight={variableOutcome.hasNextPage}
        onLoadMoreRight={variableOutcome.loadMore}
        buttonIcon={<PlusIcon size={20} />}
        buttonName='Add New Expense'
        buttonIsCurrentlySelected={false}
        buttonCustomColor={OUTCOME_COLOR}
        buttonCustomHoveredColor='#f24822'
        buttonOnClick={() => navigate('/home/transactionregistry/registryoptions?tab=outcome')}
      />
    </div>
  )
}

export default TransactionRegistry
