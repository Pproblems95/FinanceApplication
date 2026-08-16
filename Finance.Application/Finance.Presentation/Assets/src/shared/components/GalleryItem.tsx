//este item lleva icono, titulo, descripcion y elemento final que puede ser lo que sea por lo que deberia ser un div que acepte lo que sea.
import * as React from 'react'

interface GalleryItemProps {
    icon: React.ReactNode,
    title: string,
    description: string,
    display: React.ReactNode,
    backgroundColor: string,
    titleColor: string,
    descriptionColor: string
};

function GalleryItem({icon, title, description, display, backgroundColor, titleColor, descriptionColor}: GalleryItemProps){
    return(
    <div className=' flex flex-row rounded-lg p-2 ' style={{background: backgroundColor}}>
      <div className=' w-full flex flex-1 items-center justify-center '>
        {icon}
      </div>
      <div className=' flex flex-3 flex-col bg-danger'>
        <span style={{color: titleColor}} className='font-bold text-2xl'>{title}</span>
        <span style={{color:descriptionColor}} className='text-md'>{description}</span>
      </div>
      <div className='flex flex-1'>
        {display}
      </div>
    </div>)
}

export default GalleryItem