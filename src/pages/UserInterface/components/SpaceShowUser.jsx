import React from 'react'
import { useNavigate } from 'react-router-dom'

const SpaceShowUser = ({space,season}) => {
    const navigate = useNavigate();
    const goSpace = ()=>{
      if(season!==null){
      navigate('/space/'+space.id)
      }else{
        alert("El curso no esta disponible")
      }
    };
  return (
    <div className='w-[20%] min-h-[150px] bg-white-500 shadow mb-4 me-4 hover:scale-110 transition hover:transition'>
          <h1 className='mt-1 ms-3'>{space.nombre}</h1>
          <h4 onClick={goSpace} className='mt-2 ms-4 cursor-pointer hover:underline'>{space.tipo}</h4>
    </div>
  )
}

export default SpaceShowUser