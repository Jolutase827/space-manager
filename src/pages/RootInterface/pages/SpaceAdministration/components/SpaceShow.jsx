import React from 'react'
import { useNavigate } from 'react-router-dom'

const SpaceShow = ({space,deleteSpace}) => {
    const navigate = useNavigate();
    const goEditSpace = ()=>navigate('/editSpace/'+space.id);
    const goSpace = ()=>navigate('/space/'+space.id);
  return (
    <div className='w-[20%] min-h-[150px] bg-white-500 shadow mb-4 me-4 hover:scale-110 transition hover:transition'>
          <h1 className='mt-1 ms-3'>{space.nombre}</h1>
          <h4 onClick={goSpace} className='mt-2 ms-4 cursor-pointer hover:underline'>{space.tipo}</h4>
          <div className='col-12 d-flex justify-around'>
          <i className="bi bi-pen cursor-pointer hover:text-gray-600 transition hover:transition text-[40px]" onClick={(e)=>goEditSpace()}></i>
          <i className="bi bi-trash3-fill cursor-pointer hover:text-red-600 transition hover:transition text-[40px]" onClick={(e)=>deleteSpace(space.id)}></i>
          </div>
    </div>
  )
}

export default SpaceShow