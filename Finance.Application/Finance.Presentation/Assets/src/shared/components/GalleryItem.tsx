//este item lleva icono, titulo, descripcion y elemento final que puede ser lo que sea por lo que deberia ser un div que acepte lo que sea.
import * as React from 'react'

interface GalleryItemProps {
    icon: React.ReactNode,
    title: string,
    description: string,
    display: React.ReactNode,
    backgroundColor: string
};

function GalleryItem({icon, title, description, display, backgroundColor}: GalleryItemProps){
    return(
    <div style={{background: backgroundColor}}>
      <div>
        {icon}
      </div>
      <div>
        {title}
        {description}
      </div>
      <div>
        {display}
      </div>
    </div>)
}

export default GalleryItem