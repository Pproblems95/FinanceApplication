
import * as React from 'react'
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import { useEffect, useState } from 'react';
import '../../styles/App.css';


function Layout() {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(true);

  const handleSideBarStatus = (state: boolean): void => {
    setIsSideBarOpen(state);
  }


  return (
    <div className='containerReact flex w-full h-screen overflow-hidden'>
      <div 
        className={`transition-all duration-500 ease-in-out overflow-hidden shrink-0 ${
          isSideBarOpen ? 'w-80 opacity-100' : 'w-0'
        }`}
      >
        <SideBar onStatusChange={handleSideBarStatus} />
      </div>
      
      <div className='layoutContent flex-1 transition-all duration-500 ease-in-out overflow-y-auto'>
        <Outlet /> 
      </div>
    </div>
  );
}

export default Layout