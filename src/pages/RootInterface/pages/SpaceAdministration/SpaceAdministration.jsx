import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SpaceShow from './components/SpaceShow';


const SpaceAdministration = ({season}) => {
  const navigate = useNavigate();
  const [spaces,setSpaces] = useState([]);
  useEffect(()=>{
    fetch('http://localhost/Space Managment/servicioAulas/service.php')
    .then(response=>response.json())
    .then(data=>{
      setSpaces(data);
    })
    .catch(error=>{console.error(error);})
  },[])
  const deleteSpace = (id)=>{
    const spacesNew = spaces.filter(space=> space.id!==id);
    setSpaces(spacesNew);
  };
  const goCreateSpace  = ()=>{
    navigate('/createSpace');
  }
  return (
    <main className="user-administration">
      <div className="col-12 d-flex justify-content-between">
        <h1 className="ms-3 mt-2 title col-3 text-[40px]">Spaces</h1>
        <div className="me-3 mt-2 d-flex justify-content-between col-5">
          <div className="d-flex align-items-center">
            <input type="radio" name="radio" />
            <label className="ms-2 mb-1">Select</label>
          </div>
          <button
            className="mt-2 rounded-pill boton-anyadir-users"
            onClick={goCreateSpace}
          >
            + Add Space
          </button>
          <form className="col-6 d-flex align-items-center position-relative ms-5">
            <i className="bi bi-search lupa"></i>
            <input
              type="text"
              name="user-search"
              className="rounded-left searcher p-1 ps-4"
              placeholder="Search user"
            />
            <button className="rounded-right button-searcher p-1 pe-2">
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="container-users mt-4 d-flex flex-wrap ps-4 pe-4">
        
        {spaces.map((space,index) => (
          <SpaceShow key={index} season={season} space={space} deleteSpace={deleteSpace}/>
        ))}
      </div>
      </main>
  )
}

export default SpaceAdministration