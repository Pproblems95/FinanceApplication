import { useCallback, useRef } from 'react';

interface VerticalGalleryProps<T> {
    backgroundColor: string,
    data: T[],
    header: React.ReactNode,
    separatorColor: string,
    renderItem: (item: T, index: number) => React.ReactNode,
    emptyMessage?: string,
    isLoading: boolean,
    hasNextPage: boolean,
    onLoadMore?: () => void
}

function VerticalGallery<T>({
    backgroundColor, 
    data = [], 
    header, 
    separatorColor, 
    renderItem,
    emptyMessage = "No hay elementos para mostrar en este momento",
    isLoading,
    hasNextPage,
    onLoadMore
}: VerticalGalleryProps<T>){
    const safeData = Array.isArray(data) ? data : [];
    const observerTarget = useRef<IntersectionObserver | null>(null);

    const lastElementRef = useCallback((node: HTMLDivElement | null) => {
        if (isLoading)
            return;

        if (observerTarget.current)
            observerTarget.current.disconnect();

        observerTarget.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasNextPage && onLoadMore ) {
                onLoadMore();
            }
        }, {
            threshold: 0.5
        });

        if (node) 
            observerTarget.current.observe(node);
    }, [isLoading, hasNextPage, onLoadMore])

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
                    safeData.map((item: T, index: number) => {
                        const isLastItem = index === safeData.length - 1;

                        return (
                            <div 
                                key={index} 
                                ref={isLastItem ? lastElementRef : null}
                                className='my-2'
                            >
                                {renderItem(item, index)}
                            </div>
                        );
                    })
                )}

                {isLoading && (
                    <div className='py-4 text-center text-indigo-400 font-medium animate-pulse'>
                        Cargando más transacciones...
                    </div>
                )}
            </div>
        </div>
    )
}

export default VerticalGallery