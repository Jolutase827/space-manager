import React, { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import "./hoja-de-estilos/Login.css";
import { useForm } from "react-hook-form";

function Login({login}) {

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [errorUser,setUser] = useState(false);
  const [errorBD,setBD] = useState(false);
  const onSubmit = (dataInput, e) => {
    setBD(false);
    setUser(false);
    fetch(
      `http://localhost/Space Managment/servicioUsuarios/service.php?nombre=${dataInput.name}&pwd=${dataInput.pwd}`
    )
      .then((response) => response.json())
      .then((data) => {

        if (data != null) {
          login(data);
          if (data.admin) {
            navigate('/rootInterface');
          }
          
        } else {
          setUser(true);
        }
        setBD(false);
      })
      .catch((error) => {
        console.log(error)
        setBD(true);
        setUser(false);
      });
  };

  return (
    <main className="login">
      <form
        className="col-12 col-md-8 col-lg-5 rounded pt-3 d-flex flex-column"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="mb-4 ms-4">Log in</h1>
        <div className="d-flex flex-column align-items-center">
          <input
            type="text"
            placeholder="User name"
            className="col-8 mb-4 rounded"
            name="name"
            {...register("name", {
              required: "Please, complete all the fieldes",
            })}
            aria-invalid={errors.name ? "true" : "false"}
          />
          <input
            type="password"
            placeholder="Password"
            className="col-8 rounded"
            name="pwd"
            {...register("pwd", {
              required: "Please, complete all the fieldes",
            })}
            aria-invalid={errors.pwd ? "true" : "false"}
          />
          <button className="button-enter mt-3 rounded" id="button-enter">
            Enter
          </button>
        </div>
        <div className="col-12 d-flex justify-content-center error">
          {(errors.name || errors.pwd) && (
            <div
              className="alert alert-danger text-center col-4 mt-3 "
              role="alert"
            >
              {" "}
              {errors.name != undefined
                ? errors.name.message
                : errors.pwd.message}
            </div>
          )}
          {!(errors.name || errors.pwd) && errorBD && (
            <div
              className="alert alert-danger text-center col-4 mt-3"
              role="alert"
            >
              Sorry, we have probles in the web please try in other time.
            </div>
          )}
          {!(errors.name || errors.pwd) && errorUser && (
            <div
              className="alert alert-danger text-center col-4 mt-3"
              role="alert"
            >
              The user name or the password are wrong
            </div>
          )}
        </div>
        <p className="col-8 ms-4 mt-4 mb-5">
          If you don't have account or forget your <strong>password</strong>{" "}
          please contact with the <a href="">adminstrator</a>
        </p>
      </form>
    </main>
  );
}

export default Login;
