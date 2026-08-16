import * as React from 'react'

interface InputFilterProps {
    icon: React.ReactNode,
    placeholder: string,
    backgroundColor: string,
    type: string,
    value: string,
    onChange: (data: string) => void
};

function InputFilter({icon, placeholder, backgroundColor, type, value, onChange}: InputFilterProps){
  const handleChange = (data: string) => {
    onChange(data);
  };

    return(
    <div className=' flex-row flex p-5 w-full rounded-lg ' style={{background: backgroundColor}}>
      <div className='flex-1 flex'>
        {icon}
      </div>
      <input className='flex-5 flex' value={value} type={type} placeholder={placeholder} onChange={(e) => handleChange(e.target.value)}/>
    </div>)
}

export default InputFilter