import React, { useState } from 'react';
import '../hoja-de-estilos/Nav.css';
function Nav() {
    const [active,setActive] = useState(1);
    const active1  = ()=>{
        setActive(1);
    }
    const active2  = ()=>{
        setActive(2);
    }
    const active3  = ()=>{
        setActive(3);
    }
    return (
        <nav class="d-flex justify-content-around align-items-center">
            <button className={active==1&& 'active'} onClick={active1}>Users</button>
            <button className={active==2&& 'active'} onClick={active2}>Spaces</button>
            <button className={active==3&& 'active'} onClick={active3}>Seasons</button>
        </nav>
    )
  
}

export default Nav