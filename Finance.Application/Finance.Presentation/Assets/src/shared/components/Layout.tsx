import * as React from 'react'

import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';

function Layout() {
  return (
    <div className='containerReact'>
      <SideBar />
      <main className="mainContent">
        <Outlet /> 
      </main>
    </div>
  );
}

export default Layout