// este input lleva un Icono un texto predeterminado y un tipo de dato como argumentos 
import * as React from 'react'

interface InputFilterProps {
    icon: React.ReactNode,
    placeholder: string,
    backgroundColor: string,
    type: string,
};

function InputFilter({icon, placeholder, backgroundColor, type}: InputFilterProps){
    return(
    <div className=' flex-row flex p-5 w-full rounded-lg ' style={{background: backgroundColor}}>
      <div className='flex-1 flex'>
        {icon}
      </div>
      <input className='flex-5 flex' type={type} placeholder={placeholder}/>
    </div>)
}

export default InputFilter