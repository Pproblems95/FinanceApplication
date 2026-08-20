import * as React from 'react'
import TransactionSources from '../../shared/components/TransactionSources'
import { PlusIcon } from '../../shared/components/icons'

function TransactionRegistry() {
    const description = 'Keep track of your Income and Outcome by registering new records and keeping track of Income & Outcome sources';
    const buttonName = 'Add New Income';
    return(
    <div>
      <TransactionSources highlightColor='#8AE985' title='Income sources' description={description} leftGalleryTitle='Constant Revenue Sources' 
      rightGalleryTitle='Variable Revenue Registrations' backgroundColor='#0A0A20' buttonIcon={(<PlusIcon size={20}/>)} buttonName={buttonName} buttonIsCurrentlySelected={false}
      buttonCustomColor='#8AE985' buttonCustomHoveredColor='#6EBA6A' buttonOnClick={() => {}}/>
    </div>
    )
}

export default TransactionRegistry