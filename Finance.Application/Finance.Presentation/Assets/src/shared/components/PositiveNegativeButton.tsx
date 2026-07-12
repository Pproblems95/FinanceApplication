//este boton solo lleva color de background, texto y accion de onclick como argumentos
import { useState } from 'react'
interface PositiveNegativeButtonProps {
    backgroundColor: string,
    text: string,
    hoveredBackgroundColor: string,
    selectedBackgroundColor: string,
    isCurrentlySelected: boolean;
    onClick: () => void
};

function PositiveNegativeButton({backgroundColor, text, hoveredBackgroundColor, selectedBackgroundColor, isCurrentlySelected, onClick}: PositiveNegativeButtonProps) {
    const [isHovered, setIsHovered] = useState(false);

    const dynamicStyle = {
        backgroundColor: isCurrentlySelected ? selectedBackgroundColor : isHovered ? hoveredBackgroundColor  : backgroundColor,
        transition: 'background-color 0.3s ease'
    };

    return(
    <div>
      <button className='cursor-pointer py-2 px-4 rounded-md text-white' style={dynamicStyle}  onClick={onClick} type="button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>{text}</button>
    </div>)
}

export default PositiveNegativeButton