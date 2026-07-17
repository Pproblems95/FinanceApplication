import * as React from 'react'

interface VerticalGalleryProps<T> {
    backgroundColor: string,
    data: T[],
    header: React.ReactNode,
    separatorColor: string,
    renderItem: (item: T, index: number) => React.ReactNode
}

function VerticalGallery<T>({backgroundColor, data, header, separatorColor, renderItem}: VerticalGalleryProps<T>){
    return(
    <div className='p-5 w-full white rounded-lg' style={{background: backgroundColor}}>
      <div className=' border-b-5' style={{borderColor: separatorColor}}>
        {header}
      </div>
      <div className=' overflow-y-auto max-h-[75vh] '>
        {data.map((item: T, index: number) => (
            <div key={index} className='my-2' onClick={() => console.log(item)}>
              {renderItem(item, index)}
            </div>))}
      </div>
    </div>)
}

export default VerticalGallery