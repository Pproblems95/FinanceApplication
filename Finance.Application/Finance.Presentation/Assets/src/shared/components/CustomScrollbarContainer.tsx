import{ useCallback, useEffect, useRef, useState, } from "react";
import '../styles/CustomScrollbarContainer.css'

//className?
const CustomScrollBarContainer = ({children, ...props}:React.ComponentPropsWithoutRef<'div'>) => {

    const contentRef = useRef<HTMLDivElement>(null);
    const scrollTrackRef = useRef<HTMLDivElement>(null);
    const scrollThumbRef = useRef<HTMLDivElement>(null);
    const observer = useRef<ResizeObserver | null>(null);
    const [thumbHeight, setTumbHeight] = useState(20);
    const [scrollStartPosition, setScrollStartPostion] = useState<number | null>(null);
    const [initialScrollTop, setInitialScrollTop] = useState<number>(0);
    const [isDragging, setIsDragging] = useState<boolean>(false);    

    function handleResize(ref: HTMLDivElement, trackSize: number) {
      const { clientHeight, scrollHeight } = ref;
      setTumbHeight((Math.max((clientHeight / scrollHeight) * trackSize, 20)));
    }

    function handleScrollButton(direction:'up'|'down') {
        const { current } = contentRef;

        if (current) {
            const scrollAmount = direction == 'down' ? 200 : -200;
            // HTML pages top is 0 , while bottom is a higher number
            current.scrollBy({top:scrollAmount, behavior:'smooth'});
            // modify this if you want it quicker or slower
        }
    }

    const handleThumb = useCallback(() => {
        if (
            !contentRef.current ||
            !scrollTrackRef.current ||
            !scrollThumbRef.current
        ) {
            return;
        }

        const { scrollTop: contentTop, scrollHeight: contentHeight } = contentRef.current;
        const { clientHeight: trackHeight } = scrollTrackRef.current;
        let newTop = (+contentTop / +contentHeight) * trackHeight;
        newTop = Math.min(newTop, trackHeight - thumbHeight);
        const thumb = scrollThumbRef.current;
        thumb.style.top = `${newTop}px`;

    }, [thumbHeight]);

    useEffect(() => {
        if (contentRef.current && scrollTrackRef.current) {
            const ref = contentRef.current;

            const {clientHeight: trackSize } = scrollTrackRef.current;
            observer.current = new ResizeObserver(() => {
                handleResize(ref, trackSize);
            });
            observer.current.observe(ref) 
            ref.addEventListener('scroll', handleThumb);

            return () => {
                observer.current?.unobserve(ref);
                ref.removeEventListener('scroll', handleThumb);
            }
        }
    }, [thumbHeight, handleThumb]);

    const handleTrack = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        
        const {current: trackCurrent} = scrollTrackRef;
        const {current: contentCurrent} = contentRef;

        if ( trackCurrent && contentCurrent ) {
            const clientY = event.clientY;
            const target = event.target as HTMLDivElement;
            const rect = target.getBoundingClientRect();
            const trackTop = rect.top;

            const thumbOffset = -(thumbHeight/2);
            const clickRatio = Math.floor(clientY - trackTop + thumbOffset) / trackCurrent.clientHeight;

            const scrollAmount = Math.floor(clickRatio * contentCurrent.scrollHeight);
            contentCurrent.scrollTo({
                top:scrollAmount,
                behavior: 'smooth',
            })
        }
    },[thumbHeight]);

    // function handleThumbMouseDown(e:MouseEvent) {
    //     e.preventDefault();
    //     e.stopPropagation();

    //     setScrollStartPostion(e.clientY);
            
    //     if (contentRef.current) setInitialScrollTop(contentRef.current.scrollTop);
    //     setIsDragging(true);
    // }

    const handleThumbMouseDown = useCallback((e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();

        setScrollStartPostion(e.clientY);

        if (contentRef.current) setInitialScrollTop(contentRef.current.scrollTop);
        setIsDragging(true);
    },[])

    const handleThumbMouseUp = useCallback((e:MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isDragging) {
            setIsDragging(false);
        }
    }, [isDragging]);

    const handleThumbMouseMove = useCallback((e:MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isDragging && contentRef.current && scrollStartPosition) {
            const { 
                scrollHeight: contentScrollHeight, 
                offsetHeight: contentOffsetHeight 
            } = contentRef.current;

            // obtiene la diferencia entre la posicion inicial en la que se hizo el drageo
            // y la posicion actual del cursor, se obtiene el resultado en pixeles

            // este resultado se multiplica por 
            // el contenido total a scrollear, entre la altura de la barra
            // esta division se hace para conseguir el ratio que representa toda 
            // la barra deslizante 

            const deltaY = (e.clientY - scrollStartPosition) * (contentOffsetHeight / thumbHeight);
            
            // se define cual de estos representa un menor valor
            const newScrollTop = Math.min(
                (initialScrollTop + deltaY),
                (contentScrollHeight - contentOffsetHeight)
            );

            contentRef.current.scroll({top:newScrollTop, behavior:'auto'});
        }
    }, [initialScrollTop, isDragging, scrollStartPosition, thumbHeight]);

    useEffect(() => {
        document.addEventListener('mousemove', handleThumbMouseMove)
        document.addEventListener('mouseup',handleThumbMouseUp);
        document.addEventListener('mouseleave', handleThumbMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleThumbMouseMove);
            document.removeEventListener('mouseup', handleThumbMouseUp);
            document.removeEventListener('mouseleave', handleThumbMouseUp);
        }

    }, [handleThumbMouseMove, handleThumbMouseUp])
    // moverlos a callback?

    return (
        <div className='custom-scrollbars_container'>

            <div className="custom-scrollbars_content" ref={contentRef} {...props}>
              {children}
            </div>

            <div className="custom-scrollbars_scrollbar">
              <button className="custom-scrollbars_button" 
                onClick={()=>{handleScrollButton('up')}}>
                ⇑
              </button>
              <div className="custom-scrollbars_track-and-thumb">
                <div 
                    className="custom-scrollbars_track"
                    ref={scrollTrackRef}
                    onClick={(MouseEvent)=>{handleTrack(MouseEvent)}}
                    style={{ cursor: isDragging ? 'grabbing' : 'pointer' }}
                ></div>
                <div 
                    className="custom-scrollbars_thumb"
                    ref={scrollThumbRef}
                    style={{
                        height: `${thumbHeight}px`,
                        cursor: isDragging ? 'grabbing' : 'pointer',
                    }}
                    onMouseDown={(e)=>{handleThumbMouseDown(e)}}
                ></div>
              </div>
              <button className="custom-scrollbars_button"
                onClick={()=>{handleScrollButton('down')}}>
                ⇓
              </button>
            </div>
          </div>
    );
};

export default CustomScrollBarContainer;
