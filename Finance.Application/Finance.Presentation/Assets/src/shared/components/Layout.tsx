

import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';

function Layout() {
  return (
    <div className='containerReact'>
      <SideBar />
      <div>
        <Outlet /> 
      </div>
    </div>
  );
}

export default Layout