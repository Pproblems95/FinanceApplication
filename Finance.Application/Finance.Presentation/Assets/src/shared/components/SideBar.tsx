import * as React from 'react'
import tempProfile from '../utils/tempProfile.jpg';
import {FlagIcon, UserIcon, MoneyIcon, LogOutIcon, BarChartIcon, CalendarIcon, SettingsIcon} from '../components/icons'
import SideBarButton from './SideBarButton';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function SideBar() {
  const options = [
    { icon: <BarChartIcon size={20} />, name: 'Predictions (Analytics)', description: 'button description', route:'/home' },
    { icon: <MoneyIcon size={20} />, name: 'Income/Outcome Registry', description: 'button description', route:'/transactionregistry' },
    { icon: <FlagIcon size={20} />, name: 'Goals', description: 'button description', route:'/goals' },
    { icon: <CalendarIcon size={20} />, name: 'History', description: 'button description', route:'/history' },
    { icon: <SettingsIcon size={20} />, name: 'Configurations', description: 'button description', route:'/configurations' },
    { icon: <UserIcon size={20} />, name: 'User Settings', description: 'button description', route:'/usersettings' }
  ]
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className='sidebarContainer flex flex-col justify-between mt-5 mb-5 ml-5'>
      
      <div className='w-full flex flex-col items-center mt-4' >
        <div className='h-auto font-bold w-full items-end justify-end  text-end  mr-7 hover:cursor-pointer'>
          <div  onClick={() => {console.log('funcion por crear xd')}}>
            X
          </div>
      </div>
        <div  className='w-25 h-25 overflow-hidden bg-black border-white border-4 rounded-full flex items-center justify-center my-5 mx-5' style={{}}>
          <img src={tempProfile} className="w-full h-full object-cover" />
        </div>
        <div className='font-bold text-lg'>
          Senshi of Izganda
        </div>
        <div>
          User since February 24 of 2026
        </div>
      </div>

      {/* TODO response list options - The selected option pops out */}
      <div style={{}} className='flex items-center justify-center mt-2'>
        <div className=' bg-black w-full mx-1 rounded-lg items-center justify-center text-center' >
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
        </div>
      </div>

      {/* This is the section that shows the users name and privileges */}
      <div className=''  >
        <SideBarButton 
        icon={<LogOutIcon/>}
        name='Log out'
        description=''
        isCurrentlySelected={false}
        customColor='black'
        onClick={() => navigate('/')}
        />
      </div>

      <div className='text-center my-1 underline hover:cursor-pointer'>
        Did you find an error? Let us know!
      </div>
    </div>
  );
}

export default SideBar;