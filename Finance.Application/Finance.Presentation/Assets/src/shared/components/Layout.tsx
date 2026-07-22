
import * as React from 'react'
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import { useEffect, useState } from 'react';



function Layout() {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(true);

  const handleSideBarStatus = (state: boolean): void => {
    setIsSideBarOpen(state);
  }

  useEffect(() => {
    console.log(isSideBarOpen);
  }, [isSideBarOpen])

  return (
    <div className='containerReact'>
      <SideBar onStatusChange={handleSideBarStatus} 
      />
      <div className='containerReact'>
        <Outlet /> 
      </div>
    </div>
  );
}

export default Layout