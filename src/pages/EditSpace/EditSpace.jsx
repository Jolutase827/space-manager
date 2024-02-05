import axios from "axios";
import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const EditSpace = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();

    const [errorName,setErrorName]= useState(false);
    const goBack = ()=> navigate('/rootInterface/aulas');
    const onSubmit = (dataInput, e) => {
        const options= {
            method: 'PUT',
            headers:{
                'Content-Type': 'aplication/json',
            },
            body: JSON.stringify({"id":id,"nombre": dataInput.name,"tipo":dataInput.tipo})
        };
        fetch('httpS://localhost/Space Managment/servicioAulas/service.php',options)
        .then(response => response.json())
        .then(data=> {
            if(data!==false){
                alert('Space has been edit yet');
                setErrorName(false);
            }else{
                setErrorName(true);
            }
            
        })
        .catch(error=>{console.error(error)
        setErrorName(false)});
    }
    useEffect(() => {
      fetch(
        "https://localhost/Space Managment/servicioAulas/service.php?id="+id
      )
        .then((response) => response.json())
        .then((data) => {
          setValue("name", data.nombre);
          setValue("tipo", data.tipo);
        });
    }, [id]);

  return (
    <main className="d-flex align-items-center justify-content-center create-user">
    <form className='col-7 rounded pb-3' onSubmit={handleSubmit(onSubmit)}>
        <h2 className='ms-3 align-items-center mt-3'><i className="bi bi-chevron-left me-3" onClick={goBack}></i> Edit space </h2>
        <div className='col-12 d-flex flex-column align-items-center  mt-3'>
            <input type="text" placeholder="User name*" className='rounded col-8 create-user' name='input-user-name'{...register("name", {required: "Please, complete all the fieldes",})} aria-invalid={errors.name ? "true" : "false"}/>
            <select name="tipo"{...register("tipo")} className='col-8 mt-3 flex items-center p-3 rounded-lg' >
                <option value="Informatica" selected>Informatica</option>
                <option value="Tecnología">Tecnología</option>
                <option value="Biblioteca">Biblioteca</option>
                <option value="Otro">Otro</option>
            </select>
            <button className='col-3 mt-3 rounded button-add-user'>Add user</button>
            <div className='col-4 mt-3' id='container-messaje'>
            {(errors.name) && (
                <div
                    className=" d-flex align-items-center justify-content-center rounded   p-3 error-message"
                    role="alert"
                >
                    {errors.name !== undefined && errors.name.message}  
                </div>
            )}
            {(!(errors.name )&&errorName)&&
                <div className=' d-flex align-items-center justify-content-center rounded p-3 error-message'>
                    <stong>Space name already exists</stong>
                </div>
            }
            </div>
        </div>

    </form>
</main>
  );
};

export default EditSpace;
