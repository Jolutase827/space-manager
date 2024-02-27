import axios from "axios";
import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState(false);
  const { id } = useParams();
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const caracteresPosibles = [
    "0123456789",
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "abcdefghijklmnopqrstuvwxyz",
    '@$%€"/:.-_',
  ];
  const goBack = () => navigate("/rootInterface");
  let [errorEmailName, setErrorEmailName] = useState(false);
  const onSubmit = (dataInput, e) => {
        const options= {
            method: 'PUT',
            headers:{
                'Content-Type': 'aplication/json',
            },
            body: JSON.stringify({"nombreUsuario": id,"nombre":dataInput.name,"apellido":dataInput.lastname,"password":dataInput.pwd, "email": dataInput.email })
        };
        fetch('http://localhost/Space Managment/servicioUsuarios/service.php',options)
        .then(response => response.json())
        .then(data=> {
            console.log(data);
            if(data===true){
                setUser({
                    email:dataInput.email,
                    username:id,
                    pwd:dataInput.pwd
                })
                setUpdatedUser(true);
                setErrorEmailName(false);
            }else{
                setErrorEmailName(true);
                setUser(null)
            }  
        })
        .catch(error=>{console.error(error)
        setErrorEmailName(false)
        setUser(null)});
  };
  const generateRandomPassword = () => {
    let pwd = "";
    let arrayPart;
    for (let i = 0; i < 12; i++) {
      arrayPart = parseInt(Math.random() * 4);
      pwd += caracteresPosibles[arrayPart].charAt(
        parseInt(Math.random() * caracteresPosibles[arrayPart].length)
      );
    }
    setValue("pwd", pwd);
  };
  useEffect(() => {
    fetch(
      "https://localhost/Space Managment/servicioUsuarios/service.php?root=1234&&nombre=" +
        id
    )
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setValue("name", data.nombre);
        setValue("email", data.email);
        setValue("lastname", data.apellido);
      });
  }, [id]);

  return (
    <main className="d-flex align-items-center justify-content-center create-user">
      <form className="col-7 rounded pb-3" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="ms-3 align-items-center mt-3">
          <i className="bi bi-chevron-left me-3" onClick={goBack}></i> Edit user {id}
        </h2>
        <div className="col-12 d-flex flex-column align-items-center mt-3">
          <div className="col-12 d-flex justify-content-center mt-2">
            <input
              type="text"
              placeholder="Name*"
              className="rounded col-3 create-user"
              name="input-name"
              {...register("name", {
                required: "Please, complete all the fieldes",
              })}
              aria-invalid={errors.name ? "true" : "false"}
            />
            <div className="col-1"></div>
            <input
              type="text"
              placeholder="Last name*"
              className="rounded col-4 create-user"
              name="input-last-name"
              {...register("lastname", {
                required: "Please, complete all the fieldes",
              })}
              aria-invalid={errors.lastname ? "true" : "false"}
            />
          </div>
          <div className="col-12 d-flex justify-content-center mt-2">
            <input
              type="password"
              placeholder="Password"
              className="rounded-left col-5 create-user"
              name="input-password"
              {...register("pwd")}
            />
            <button
              className="col-3 rounded-right button-generate-random"
              type="button"
              onClick={generateRandomPassword}
            >
              Generate random
            </button>
          </div>
          <input
            type="email"
            placeholder="Email*"
            className="rounded mt-2 col-8 create-user"
            name="input-email"
            {...register("email", {
              required: "Please, complete all the fieldes",
            })}
            aria-invalid={errors.email ? "true" : "false"}
          />
          <button className="col-3 mt-3 rounded button-add-user">
            Edit user
          </button>
          <div className="col-4 mt-3" id="container-messaje">
            {(errors.name ||
              errors.lastname ||
              errors.email) && (
              <div
                className=" d-flex align-items-center justify-content-center rounded   p-3 error-message"
                role="alert"
              >
                {errors.name !== undefined
                  ? errors.name.message
                  : errors.email !== undefined
                  ? errors.email.message
                  :  errors.lastname.message}
              </div>
            )}
            {!(
              errors.name ||
              errors.lastname ||
              errors.email
            ) &&
              errorEmailName && (
                <div className=" d-flex align-items-center justify-content-center rounded p-3 error-message">
                  <stong>This email is selected by another user </stong>
                </div>
              )}
            {!(
              errors.name ||
              errors.lastname ||
              errors.email ||
              errorEmailName
            ) &&
              updatedUser && (
                <div className=" d-flex align-items-center justify-content-center rounded p-3 good-message">
                  <stong>
                    The user has been edit succsessfully{" "}
                    <a
                      href={`mailto:${user.email}?subject=Your dates had been changed in Space Manager&body=This is your user name: '${user.username}'. And this is your password: '${user.pwd}' `}
                    >
                      {" "}
                      send email
                    </a>
                  </stong>
                </div>
              )}
          </div>
        </div>
      </form>
    </main>
  );
};

export default EditUser;
