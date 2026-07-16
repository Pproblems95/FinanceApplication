import * as React from 'react'

interface VerticalGalleryProps<T> {
    backgroundColor: string,
    data: T[],
    header: React.ReactNode,
    renderItem: (item: T, index: number) => React.ReactNode
}

function VerticalGallery<T>({backgroundColor, data, header, renderItem}: VerticalGalleryProps<T>){
    return(
    <div style={{background: backgroundColor}}>
      <div>
        {header}
      </div>
      <div>
        {data.map((item: T, index: number) => (
            <div key={index} onClick={() => console.log(item)}>
              {renderItem(item, index)}
            </div>))}
      </div>
    </div>)
}

export default VerticalGallery