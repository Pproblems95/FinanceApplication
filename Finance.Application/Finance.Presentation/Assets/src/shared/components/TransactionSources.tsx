import * as React from 'react'
import { CreditCardIcon } from './icons'
import SideBarButton from './SideBarButton'
import VerticalGallery from './VerticalGallery'

interface TransactionSourcesType<TLeft, TRight> {
    highlightColor: string,
    title: string,
    description: string,
    backgroundColor: string,

    galleryBackgroundColor: string,
    gallerySeparatorColor: string,
    galleryTitleColor: string,
    galleryMaxHeight?: string,

    leftGalleryTitle: string,
    leftItems: TLeft[],
    renderLeftItem: (item: TLeft, index: number) => React.ReactNode,
    leftEmptyMessage?: string,
    isLoadingLeft?: boolean,
    hasNextPageLeft?: boolean,
    onLoadMoreLeft?: () => void,

    rightGalleryTitle: string,
    rightItems: TRight[],
    renderRightItem: (item: TRight, index: number) => React.ReactNode,
    rightEmptyMessage?: string,
    isLoadingRight?: boolean,
    hasNextPageRight?: boolean,
    onLoadMoreRight?: () => void,

    buttonIcon: React.ReactNode,
    buttonName: string,
    buttonIsCurrentlySelected: boolean,
    buttonCustomColor: string,
    buttonCustomHoveredColor: string,
    buttonOnClick: () => void;
}

function TransactionSources<TLeft, TRight>({
  highlightColor,
  title,
  description,
  backgroundColor,

  galleryBackgroundColor,
  gallerySeparatorColor,
  galleryTitleColor,
  galleryMaxHeight = '220px',

  leftGalleryTitle,
  leftItems,
  renderLeftItem,
  leftEmptyMessage,
  isLoadingLeft = false,
  hasNextPageLeft = false,
  onLoadMoreLeft,

  rightGalleryTitle,
  rightItems,
  renderRightItem,
  rightEmptyMessage,
  isLoadingRight = false,
  hasNextPageRight = false,
  onLoadMoreRight,

  buttonIcon,
  buttonName,
  buttonIsCurrentlySelected,
  buttonCustomColor,
  buttonCustomHoveredColor,
  buttonOnClick
}: TransactionSourcesType<TLeft, TRight>) {

    const galleryHeader = (galleryTitle: string) => (
      <p style={{ color: galleryTitleColor }} className='text-lg'>{galleryTitle}</p>
    );

    return(
        <div
        style={{ background: backgroundColor }}
        className='flex flex-row flex-1 w-full rounded-lg border-t border-r border-b border-[#40404d]'
        >
          <div style={{ background: highlightColor }} className='rounded-l-2xl w-3 shrink-0' />

          <div className='flex flex-col flex-1 min-w-0 p-5'>
            <div className='flex flex-row items-start justify-between gap-4'>
              <div className='flex flex-col min-w-0'>
                <div className='flex flex-row items-center gap-3'>
                  <CreditCardIcon size={20} color={galleryTitleColor} />
                  <p className='text-2xl'>{title}</p>
                </div>
                <p className='text-md' style={{ color: galleryTitleColor }}>{description}</p>
              </div>
              <div className='shrink-0'>
                <SideBarButton icon={buttonIcon} name={buttonName} isCurrentlySelected={buttonIsCurrentlySelected} customColor={buttonCustomColor}
                customHoveredColor={buttonCustomHoveredColor} onClick={buttonOnClick}/>
              </div>
            </div>

            <div className='flex flex-row gap-5 mt-3'>
              <div className='flex flex-1 min-w-0'>
                <VerticalGallery<TLeft>
                  backgroundColor={galleryBackgroundColor}
                  separatorColor={gallerySeparatorColor}
                  data={leftItems}
                  header={galleryHeader(leftGalleryTitle)}
                  renderItem={renderLeftItem}
                  emptyMessage={leftEmptyMessage}
                  isLoading={isLoadingLeft}
                  hasNextPage={hasNextPageLeft}
                  onLoadMore={onLoadMoreLeft}
                  maxHeight={galleryMaxHeight}
                />
              </div>
              <div className='flex flex-1 min-w-0'>
                <VerticalGallery<TRight>
                  backgroundColor={galleryBackgroundColor}
                  separatorColor={gallerySeparatorColor}
                  data={rightItems}
                  header={galleryHeader(rightGalleryTitle)}
                  renderItem={renderRightItem}
                  emptyMessage={rightEmptyMessage}
                  isLoading={isLoadingRight}
                  hasNextPage={hasNextPageRight}
                  onLoadMore={onLoadMoreRight}
                  maxHeight={galleryMaxHeight}
                />
              </div>
            </div>
          </div>
        </div>
    )
}

export default TransactionSources
