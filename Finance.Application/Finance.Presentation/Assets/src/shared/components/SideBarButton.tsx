import * as React from 'react'
import { useState } from 'react';
import '../styles/Sidebar.css';

interface SideBarButtonProps {
  icon: React.ReactNode;
  name: string;
  description?: string;
  isCurrentlySelected: boolean;
  customColor?: string;
  customHoveredColor?: string; 
  onClick: () => void;
}

interface DynamicDescriptionProps {
    description: string|undefined;
    isCurrentlySelected: boolean;
};

function DynamicDescription({description, isCurrentlySelected}:DynamicDescriptionProps){
    if (isCurrentlySelected) {
        return(
            <div style={{fontSize:'11px', color:"#D2CDF2"}}>{description ?? "No description was set"}</div>
        );
    }
    return (<div></div>);
}

function SideBarButton({ icon, name, description, isCurrentlySelected, customColor, customHoveredColor, onClick }: SideBarButtonProps) {

    const [isHovered, setIsHovered] = useState(false);

    const dynamicStyle = {
        backgroundColor: isHovered 
            ? (customHoveredColor ? customHoveredColor : '#2b2b63')
            : customColor 
            ? customColor 
            : isCurrentlySelected 
            ? '#1F1F40' 
            : '#141423',
        transition: 'background-color 0.3s ease',
        paddingTop:"15px",
        paddingBottom:"15px"
    };

    const buttonTitleStyle = {
        fontWeight:"bold",
        fontSize: isCurrentlySelected ? "15px" : "14px",
        paddingLeft:"2px"
    }
    
    const dynamicDisplay = {
        fontSize: (name !="Log out" && isCurrentlySelected) ? '20px' : '0px',
        transition: 'all 0.15s cubic-bezier(0.4, 0, 1, 1)',
    }

    return(
        <div 
            className="flex flex-row items-center p-2 cursor-pointer rounded-lg mx-2 my-3 justify-around"
            style={dynamicStyle}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={{ width:"20%", display:'flex', justifyContent:'center'}}>
                {icon}
            </div>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', width:"80%"}}>
                <div className='flex flex-col flex-6 pl-1  items-start'>
                    <div style={buttonTitleStyle}>
                        {name}
                    </div>
                    <div>
                        <DynamicDescription
                            description={description}
                            isCurrentlySelected={isCurrentlySelected}
                        />
                    </div>
                </div>
                
                <><div className='flex-1'><div style={ dynamicDisplay }>●</div></div></>

            </div>
        </div>
    )
}

export default SideBarButton;
