import * as React from 'react'
import { CreditCardIcon } from './icons'
import SideBarButton from './SideBarButton'

interface TransactionSourcesType {
    highlightColor: string,
    title: string,
    description: string,
    leftGalleryTitle: string,
    rightGalleryTitle: string,
    backgroundColor: string,
    buttonIcon: React.ReactNode
    buttonName: string,
    buttonIsCurrentlySelected: boolean,
    buttonCustomColor: string, 
    buttonCustomHoveredColor: string,
    buttonOnClick: () => void;
}

// interface SideBarButtonProps {
//   icon: React.ReactNode;
//   name: string;
//   description?: string;
//   isCurrentlySelected: boolean;
//   customColor?: string;
//   customHoveredColor?: string; 
//   onClick: () => void;
// }

function TransactionSources({
  highlightColor,
  title,
  description,
  leftGalleryTitle,
  rightGalleryTitle,
  backgroundColor,
  buttonIcon,
  buttonName,
  buttonIsCurrentlySelected,
  buttonCustomColor,
  buttonCustomHoveredColor,
  buttonOnClick
}: TransactionSourcesType) {
    return(
        <div style={{background: backgroundColor}} className='flex flex-row flex-1 w-full rounded-lg'>
          <div style={{background: highlightColor}} className=' rounded-l-2xl w-3' >
            
          </div>

          <div className='p-5'>
            <div className='flex flex-row' >
              <div className='flex flex-col'>
                <div className='flex flex-row' >
                  <CreditCardIcon size={20} />
                  <p>{title}</p>
                </div>
                <p>{description}</p>
              </div>
              <div>
                <SideBarButton icon={buttonIcon} name={buttonName} isCurrentlySelected={buttonIsCurrentlySelected} customColor={buttonCustomColor} 
                customHoveredColor={buttonCustomHoveredColor} onClick={buttonOnClick}/>
              </div>
            </div>
            <div className='flex flex-row' >
              <div>
                verGallery1
              </div>
              <div>
                verGallery2
              </div>
            </div>
          </div>
        </div>
    )
}

export default TransactionSources