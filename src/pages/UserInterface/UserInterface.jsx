import React, { useEffect, useState } from 'react'
import SpaceShowUser from './components/SpaceShowUser';

const UserInterface = ({season}) => {
    const [spaces,setSpaces] = useState([]);
    useEffect(()=>{
      fetch('http://localhost/Space Managment/servicioAulas/service.php')
      .then(response=>response.json())
      .then(data=>{
        setSpaces(data);
      })
      .catch(error=>{console.error(error);})
    },[])

    return (
      <main className="user-administration">
        <div className="col-12 d-flex justify-content-between">
          <h1 className="ms-3 mt-2 title col-3 text-[40px]">Spaces</h1>
        </div>
        <div className="container-users mt-4 d-flex flex-wrap ps-4 pe-4">
          
          {spaces.map((space,index) => (
            <SpaceShowUser key={index} space={space} season={season}/>
          ))}
        </div>
        </main>
    )
}

export default UserInterface