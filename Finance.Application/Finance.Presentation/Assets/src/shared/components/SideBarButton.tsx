import * as React from 'react'
import { useState } from 'react';

function SideBarButton() {
    const [isSelected, setIsSelected] = useState(false);
    return(
        <div className='flex flex-row'>
            <div>
                Icono
            </div>
            <div>
                <div>
                    Nombre del boton
                </div>
                <div>
                    Descripcion del boton
                </div>
            </div>
        </div>
    )
}

export default SideBarButton