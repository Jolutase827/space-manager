import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Space = ({user}) => {
  const { id } = useParams();
  const [space,setSpace] = useState({id:id, nombre:null,tipo:null});
  useEffect(() => {
    fetch(
      "https://localhost/Space Managment/servicioAulas/service.php?id="+id
    )
      .then((response) => response.json())
      .then((data) => {
        setSpace({id:data.id, nombre:data.nombre,tipo:data.tipo});
      });
  }, [id]);
  return (
    <main className="user-administration">
        <div className="col-12 d-flex justify-content-between">
            <h1 className="ms-3 mt-2 title col-3 text-[40px]">Space {space.nombre}</h1>
        </div>
        <div className='flex justify-center flex-col w-[100%] shadow-sm col-12'>
          <div className='flex col-8'>
            <div className='col-3'></div>
            <div className='col-3'></div>
            <div className='col-3'></div>
            <div className='col-3'></div>
            <div className='col-3'></div>
            <div className='col-3'></div>
          </div>
        </div>
    </main>
  )
}

export default Space