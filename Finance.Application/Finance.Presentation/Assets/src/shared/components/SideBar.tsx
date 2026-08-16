import tempProfile from '../utils/tempProfile.jpg';
import { useAuth0 } from '@auth0/auth0-react';
import {FlagIcon, UserIcon, MoneyIcon, LogOutIcon, BarChartIcon, CalendarIcon, SettingsIcon, HamburgerIcon} from '../components/icons'
import SideBarButton from './SideBarButton';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface sideBarProps {
  onStatusChange: (data: boolean) => void
};

function SideBar({onStatusChange}: sideBarProps) {

  const [isOpen, setIsOpen] = useState(true)
  const { user, isAuthenticated } = useAuth0();
  const logout = useAuth0().logout;
  const options = [
    { icon: <BarChartIcon size={20} />, name: 'Predictions (Analytics)', description: 'button description', route:'/home' },
    { icon: <MoneyIcon size={20} />, name: 'Income/Outcome Registry', description: 'button description', route:'/home/transactionregistry' },
    { icon: <FlagIcon size={20} />, name: 'Goals', description: 'button description', route:'/home/goals' },
    { icon: <CalendarIcon size={20} />, name: 'History', description: 'button description', route:'/home/history' },
    { icon: <SettingsIcon size={20} />, name: 'Configurations', description: 'button description', route:'/home/configurations' },
    { icon: <UserIcon size={20} />, name: 'User Settings', description: 'button description', route:'/home/usersettings' }
  ]
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    onStatusChange(isOpen);
  }, [isOpen])

  return (
    <div>
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
      <div className={`sidebarContainer w-80 h-full flex flex-col justify-between py-5 px-3 ${isOpen ? 'opacity-100' : 'opacity-0 duration-300'}`}>
        
        <div className='w-full flex flex-col items-center mt-4'>
          <div className='h-auto font-bold w-full text-end pr-4 hover:cursor-pointer'>
            <div onClick={() => setIsOpen(false)} className="inline-block p-1">
              X
            </div>
          </div>
          <div className='w-24 h-24 overflow-hidden bg-black border-white border-4 rounded-full flex items-center justify-center my-3'>
            <img src={user?.picture} className="w-full h-full object-cover" alt="User avatar" />
          </div>
          <div className='font-bold text-lg text-center '>
            {user?.name ?? 'usuario'}
          </div>
          <div className='text-xs text-gray-400'>
            {user?.updated_at}
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
          customHoveredColor='red'
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
          />
        </div>

        <div className='text-center my-1 underline hover:cursor-pointer'>
          Did you find an error? Let us know!
        </div>
      </div>
    </div>
    
  );
}

export default SideBar;