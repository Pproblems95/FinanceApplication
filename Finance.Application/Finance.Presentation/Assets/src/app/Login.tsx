import * as React from 'react'
import { Router, useNavigate } from 'react-router-dom'

function Login(){
    const navigate = useNavigate();
    return(
    <div>
        <button style={{background: 'yellow', color:'black'}} onClick={() => {navigate('/home')}}>
            Boton provisional para navegar al putisimo home page pq el putisimo fierran no ha hecho el homepage -Miguel
        </button>
    </div>
    )
}

export default Login