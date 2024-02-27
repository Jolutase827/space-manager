import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const SeasonAdministration = ({season,closeSeason}) => {
  const navigate = useNavigate();
  const goCreateSpace  = ()=>{
    navigate('/addHolidays/'+1);
  }
  const goCreateSeason  = ()=>{
    navigate('/createSeason');
  }
  const deleteSeason = ()=>{
    axios
    .delete(`http://localhost/Space Managment/servicioCursos/service.php`,{body:{id:season.id}})
    .then(() => {
      closeSeason();
      alert("Sesion borrada!");
    });
  }
  
  return (
    <main className="user-administration">
      <div className="col-12 d-flex justify-content-between">
        <h1 className="ms-3 mt-2 title col-3 text-[40px]">Season</h1>
      </div>
      <div className="container-users mt-4 d-flex flex-wrap ps-4 pe-4">
      <div className=" mt-2 d-flex justify-content-center col-12 h-[50vh]">
          {(season!=null)?<><button
            className="mt-2 rounded-md boton-anyadir-users"
            onClick={goCreateSpace}
          >
            <h1>+Add Holiday</h1>
          </button>
          <button
            className="mt-2 ms-5 rounded-md h-[70%] px-3 text-white hover:bg-red-500 hover:transition transition bg-red-600"
            onClick={deleteSeason}
          >
            <h1>Close season</h1>
          </button></>:<button
            className="mt-2 ms-5 rounded-md h-[70%] px-3 text-white hover:bg-green-500 hover:transition transition bg-green-600"
            onClick={goCreateSeason}
          >
            <h1>Create season</h1>
          </button>}
          
        </div>
       
      </div>
      </main>
  )
};

export default SeasonAdministration;
