import React from "react";
import {  useNavigate } from "react-router-dom";

const UserShow = ({ user, deleteUser }) => {
    const navigate = useNavigate();
    const goEdit = ()=>navigate('/editUser/'+user.nombreUsuario);
  return (
    <div
      className="usuario col-11 d-flex justify-content-between p-2 justify-content-center rounded mb-1"
    >
      <h4 className="col-8 mt-1 ms-4">{user.nombreUsuario}</h4>
      <div className="col-1 d-flex justify-content-between me-5 mt-1">
        <i className="bi bi-file-text"></i>
        <i className="bi bi-pen" onClick={goEdit}></i>
        <i className="bi bi-trash3-fill" onClick={()=> deleteUser(user.nombreUsuario)}></i>
      </div>
    </div>
  );
};

export default UserShow;
