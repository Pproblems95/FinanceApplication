
// import { useState } from 'react'
// import reactLogo from '../assets/react.svg'
// import viteLogo from '/vite.svg'
import '../styles/App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <body>
        <div className='containerReact'>

          {/* TODO refactorizar codigo para separar en componentes */}
          {/* Migrarlo a su propio componente */}
          <div className='sidebarContainer'>
            {/* Name of app */}
            {/* Side bar content */}
            {/* x at the Top */}
            <div style={{backgroundColor:"blue"}}>

            </div>
            {/* TODO response list options */}
            {/* The selected option pops out */}
            {/* None selected options have a regular style */}
            <div style={{backgroundColor:"yellow"}}>

            </div>
            {/* This is the section that shows the users name and privileges */}
            <div style={{backgroundColor:"orange"}}>

            </div>
          </div>

          {/* Migrarlo a su propio componente */}
          <div>
            x
          </div>
        </div>
      </body>
      {/* <div style={{backgroundColor: "#2a2a45"}}>
        e
      </div> */}
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more!!
      </p> */}
    </>
  )
}

export default App
