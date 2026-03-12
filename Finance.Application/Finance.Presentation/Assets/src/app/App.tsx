import * as React from 'react'
// import { useState } from 'react'
// import reactLogo from '../assets/react.svg'
// import viteLogo from '/vite.svg'
import '../styles/App.css';

import SideBar from '../shared/components/SideBar'; 

function App() {
  return (
    <div className='containerReact'>
      {/* Componente Sidebar Refactorizado */}
      <SideBar />

      {/* Contenido Principal (Lo que falta refactorizar) */}
      <div className="mainContent">
        {/* Aquí es donde normalmente iría el <Outlet /> si usas el Router */}
        <h1>Contenido Principal</h1>
        <div style={{ border: '1px solid white', padding: '10px' }}>
          x
        </div>
      </div>
    </div>
  );
}

export default App;
