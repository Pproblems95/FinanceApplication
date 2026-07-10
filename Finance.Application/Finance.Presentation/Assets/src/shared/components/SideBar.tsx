import * as React from 'react'
import tempProfile from '../utils/tempProfile.jpg';
import { useAuth0 } from '@auth0/auth0-react';
import {FlagIcon, UserIcon, MoneyIcon, LogOutIcon, BarChartIcon, CalendarIcon, SettingsIcon, HamburgerIcon, ImCrossIcon} from '../components/icons'
import SideBarButton from './SideBarButton';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';
import CustomScrollBarContainer from './CustomScrollbarContainer';

function SideBar() {

  const [isOpen, setIsOpen] = useState(true)
  const { user, isAuthenticated } = useAuth0();
  const logout = useAuth0().logout;
  const options = [
    { icon: <BarChartIcon size={26} />, name: 'Analytics', description: 'The future within your present', route:'/home' },
    { icon: <MoneyIcon size={26} />, name: 'Financial Registrations', description: 'button description', route:'/home/transactionregistry' },
    { icon: <FlagIcon size={26} />, name: 'Goals', description: 'button description', route:'/home/goals' },
    { icon: <CalendarIcon size={26} />, name: 'History', description: 'button description', route:'/home/history' },
    { icon: <SettingsIcon size={26} />, name: 'Configurations', description: 'button description', route:'/home/configurations' },
    { icon: <UserIcon size={26} />, name: 'User Settings', description: 'button description', route:'/home/usersettings' }
  ]
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={{display:'flex', height:"100%", minHeight:"100", maxHeight:"100%", justifyContent:'center', alignItems:'center' }}>
      <div>
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="fixed top-5 left-5 bg-purple-600 text-white p-2 rounded z-50"
          >
            <HamburgerIcon  size={20}/>
          </button>
        )}
      </div>
      <div 
        style={{display:'flex', flexDirection:'column'}}
        className={`
        sidebarContainer justify-between items-center
        transform transition-all duration-400 ease-in-out
        ${isOpen ? 'translate-x-0 opacity-100 ml-5' : '-translate-x-full opacity-0 ml-0'}
      `}>
        
        <div className='w-full flex flex-col items-center' >
          {/* aqui va ir junto el icono de cerrar y el nombre */}

          {/* Este es el contenedor con el nombre */}
          <div style={{width:'100%', maxHeight:'300px', height:"10%"}}>
            
            <div className='mr-3' style={{position:'absolute', top:'10px', left:'220px'}}>
              <div className='flex h-auto font-bold w-full items-end justify-end  text-end  mr-7 hover:cursor-pointer'>
                <div style={{background:"#292937", justifyContent:"end", padding:"12px",  borderRadius:"50%"}}  onClick={() => {setIsOpen(false)}}>
                  <ImCrossIcon size={15} />
                </div>
              </div>
            </div>

            <div className='flex flex-col items-center'>
              <div className='w-25 h-25 overflow-hidden bg-black border-white border-4 rounded-full flex items-center justify-center my-5 mx-5' style={{}}>
                <img src={user?.picture} className="w-full h-full object-cover" />
              </div>
              <div className='font-bold text-lg'>
                {user?.name ?? "Unknown"}
              </div>
              <div>
                { user?.updated_at ?? new Date().toDateString()}
              </div>
            </div>

          </div>

        </div>

        {/* TODO response list options - The selected option pops out */}

        {/* ButtonsContainer */}
        <div style={{ width:'96%', height:'100%', overflow:'hidden', display:'flex', borderTop:'solid 3px #1e1e2e', borderBottom:'solid 3px #1e1e2e'}} className=' justify-center align-middle mt-2'>
          
          <div style={{width:"98%", overflowY:'auto', height:"97%" }} className='mt-0.5 overflow-x-hidden customScrollBar' >
            <div className='w-full mx-1 rounded-lg items-center justify-center text-center' >
              
              {options.map((option, index) => (
                <SideBarButton
                  key={index}
                  icon={option.icon}
                  name={option.name}
                  description={option.description}
                  isCurrentlySelected={location.pathname === option.route}
                  onClick={() => {navigate(option.route)}}
                />
              ))}

              <div className=''  >
                <SideBarButton 
                icon={<LogOutIcon size={26}/>}
                name='Log out'
                description=''
                isCurrentlySelected={false}
                // customColor='black'
                // customHoveredColor='red'
                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                />
              </div>

            </div>
          </div>

        </div>
        

        {/* Disclaimer */}
        <div style={{ fontSize:"12px", maxHeight:'30px' }} className='flex-1 p-1.5 text-center my-1 underline hover:cursor-pointer'>
          Did you find an error? Let us know!
        </div>
      </div>
    </div>
    
  );
}

export default SideBar;
