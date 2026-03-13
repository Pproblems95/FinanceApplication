import * as React from 'react'
import tempProfile from '../utils/tempProfile.jpg';

function SideBar() {
  return (
    <div className='sidebarContainer flex flex-col justify-around'>
      
      <div className='w-full flex flex-col justify-content-center items-center mb-5' >
        <div  className='w-20 h-20 overflow-hidden bg-black border-white border-4 rounded-full flex items-center justify-center my-5 mx-5' style={{}}>
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
      <div style={{}} className='flex items-center justify-center'>
        <div className=' bg-black w-full mx-2 rounded-lg items-center justify-center text-center'>
          x
        </div>
      </div>

      {/* This is the section that shows the users name and privileges */}
      <div style={{ backgroundColor: "orange", height: '100px', borderRadius: '0 0 1.5rem 1.5rem' }}>
        {/* Info del usuario */}x
      </div>
    </div>
  );
}

export default SideBar;