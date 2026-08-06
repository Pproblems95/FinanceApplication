import * as React from 'react'

interface VerticalGalleryProps<T> {
    backgroundColor: string,
    data: T[],
    header: React.ReactNode,
    separatorColor: string,
    renderItem: (item: T, index: number) => React.ReactNode,
    emptyMessage?: string,
    scrollHandler: () => void;
}

function VerticalGallery<T>({
    backgroundColor, 
    data = [], 
    header, 
    separatorColor, 
    renderItem,
    emptyMessage = "No hay elementos para mostrar en este momento",
    scrollHandler
}: VerticalGalleryProps<T>){
    const safeData = Array.isArray(data) ? data : [];
    return(
        <div className='p-5 w-full rounded-lg' style={{ background: backgroundColor }}>
            <div className='border-b-4 pb-2' style={{ borderColor: separatorColor }}>
                {header}
            </div>

            <div className='overflow-y-auto max-h-[75vh]'>
                {safeData.length === 0 ? (
                    <div className='flex items-center justify-center py-10 text-center text-gray-500 font-medium'>
                        <p>{emptyMessage}</p>
                    </div>
                ) : (
                    safeData.map((item: T, index: number) => (
                        <div key={index} className='my-2' onClick={() => console.log(item)}>
                            {renderItem(item, index)}
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default VerticalGallery