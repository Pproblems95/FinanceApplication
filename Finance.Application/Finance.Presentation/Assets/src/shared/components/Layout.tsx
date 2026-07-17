

import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';

function Layout() {
  return (
    <div className='containerReact'>
      <SideBar />
      <div className='containerReact'>
        <Outlet /> 
      </div>
    </div>
  );
}

export default Layout