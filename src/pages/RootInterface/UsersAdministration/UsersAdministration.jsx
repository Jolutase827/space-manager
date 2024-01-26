import React, { useEffect, useState } from "react";
import "./hoja-de-estilos/UsersAdministration.css";
import { useNavigate } from "react-router-dom";
import UserShow from "./components/UserShow";
import axios from "axios";
function UsersAdministration() {
  const [users, setUsers] = useState([]);
  const getData = async () => {
    const res = await axios.get(
      "http://localhost/Space Managment/servicioUsuarios/service.php"
    );
    setUsers(res.data);
  };
  const deleteUser = (nombreUsuario)=>{
    const options= {
        method: 'DELETE',
        headers:{
            'Content-Type': 'aplication/json',
        },
        body: JSON.stringify({"nombreUsuario": nombreUsuario}),
    };
    fetch('http://localhost/Space Managment/servicioUsuarios/service.php',options)
    .catch(error=>console.log(error))
    .finally(()=>{
        const nuevoUsers= users.filter((user)=>user.nombreUsuario!==nombreUsuario);
        setUsers(nuevoUsers);
    });
  }
  useEffect(() => {
    getData();
  }, []);
  const navigate = useNavigate();
  const goCreateUsers = () => navigate("/createUser");
  return (
    <main className="user-administration">
      <div className="col-12 d-flex justify-content-between">
        <h1 className="ms-3 mt-2 title col-3">Users</h1>
        <div className="me-3 mt-2 d-flex justify-content-between col-5">
          <div className="d-flex align-items-center">
            <input type="radio" name="radio" />
            <label className="ms-2 mb-1">Select</label>
          </div>
          <button
            className="mt-2 rounded-pill boton-anyadir-users"
            onClick={goCreateUsers}
          >
            <i className="bi bi-person-plus-fill"></i> Add Users
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
      <div className="container-users mt-4 d-flex flex-column align-items-center">
        {users.map((user,index) => (
          <UserShow key={index} user={user} deleteUser={deleteUser}/>
        ))}
      </div>
      <br />
    </main>
  );
}

export default UsersAdministration;
