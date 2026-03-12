import * as React from 'react'

function SideBar() {
  return (
    <div className='sidebarContainer'>
      {/* Name of app & x at the Top */}
      <div style={{ backgroundColor: "blue", height: '50px', borderRadius: '1.5rem 1.5rem 0 0' }}>
        {/* Contenido superior */}
      </div>

      {/* TODO response list options - The selected option pops out */}
      <div style={{ backgroundColor: "yellow", flex: 1 }}>
        {/* Aquí irán tus opciones de menú */}
      </div>

      {/* This is the section that shows the users name and privileges */}
      <div style={{ backgroundColor: "orange", height: '100px', borderRadius: '0 0 1.5rem 1.5rem' }}>
        {/* Info del usuario */}
      </div>
    </div>
  );
}

export default SideBar;