import * as React from 'react'
import { useState } from 'react';

interface SideBarButtonProps {
  icon: React.ReactNode;
  name: string;
  description?: string;
  isCurrentlySelected: boolean;
  customColor?: string;
  customHoveredColor?: string; 
  onClick: () => void;
}

function SideBarButton({ icon, name, description, isCurrentlySelected, customColor, customHoveredColor, onClick }: SideBarButtonProps) {

    const [isHovered, setIsHovered] = useState(false);

    const dynamicStyle = {
        backgroundColor: isHovered 
            ? (customHoveredColor ? customHoveredColor : '#8b7ac9')
            : customColor 
            ? customColor 
            : isCurrentlySelected 
            ? '#6a5ec1' 
            : '#4a3d90',
        transition: 'background-color 0.3s ease'
    };
    return(
        <div 
            className="flex flex-row items-center p-2 cursor-pointer rounded-lg mx-2 my-3 justify-around"
            style={dynamicStyle}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div>
                {icon}
            </div>
            <div>
                <div>
                    {name}
                </div>
                <div>
                    {description ? description : ''}
                </div>
            </div>
        </div>
    )
}

export default SideBarButton