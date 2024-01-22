import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './hoja-de-estilos/CreateUser.css';
import { useForm } from "react-hook-form";

function CreateUser() {
    const params = useParams();
    const navigate = useNavigate();
    const { path } = params;
    const {
        register,
        setValue,
        formState: { errors },
        handleSubmit,
      } = useForm();
    const caracteresPosibles= ['0123456789','ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz','@$%€"/:.-_'];
    const goBack = ()=> navigate('/rootInterface');
    let [errorEmailName,setErrorEmailName] = useState(false);
    let [user,setUser] = useState(null);
    const onSubmit = (dataInput, e) => {
        const options= {
            method: 'POST',
            headers:{
                'Content-Type': 'aplication/json',
            },
            body: JSON.stringify({"nombreUsuario": dataInput.username,"nombre":dataInput.name,"apellido":dataInput.lastname,"password":dataInput.pwd, "email": dataInput.email })
        };
        fetch('https://localhost/Space Managment/servicioUsuarios/service.php',options)
        .then(response => response.json())
        .then(data=> {
            if(data!=null){
                setUser({
                    email:dataInput.email,
                    pwd:dataInput.pwd,
                    username:dataInput.username
                })
                setValue('pwd','');
                setValue('username','');
                setValue('name','');
                setValue('email','');
                setValue('lastname','');
                setErrorEmailName(false);
            }else{
                setErrorEmailName(true);
                setUser(null)
            }
            
        })
        .catch(error=>{console.error(error)
        setErrorEmailName(false)
        setUser(null)});
    }
    const generateRandomPassword=()=>{
        let pwd = '';
        let arrayPart;
        for(let i=0; i<12;i++){
            arrayPart = parseInt(Math.random()*4);
            pwd += caracteresPosibles[arrayPart].charAt(parseInt(Math.random()*(caracteresPosibles[arrayPart].length)));
        }
        setValue('pwd',pwd);
    }
    return (
        <main className="d-flex align-items-center justify-content-center create-user">
            <form className='col-7 rounded pb-3' onSubmit={handleSubmit(onSubmit)}>
                <h2 className='ms-3 align-items-center mt-3'><i className="bi bi-chevron-left me-3" onClick={goBack}></i> Create user</h2>
                <div className='col-12 d-flex flex-column align-items-center mt-3'>
                    <input type="text" placeholder="User name*" className='rounded col-8 create-user' name='input-user-name'{...register("username", {required: "Please, complete all the fieldes",})} aria-invalid={errors.username ? "true" : "false"}/>
                    <div className='col-12 d-flex justify-content-center mt-2'>
                        <input type="text" placeholder='Name*' className='rounded col-3 create-user' name='input-name' {...register("name", {required: "Please, complete all the fieldes",})} aria-invalid={errors.name ? "true" : "false"}/>
                        <div className="col-1"></div>
                        <input type="text" placeholder='Last name*' className='rounded col-4 create-user' name='input-last-name' {...register("lastname", {required: "Please, complete all the fieldes",})} aria-invalid={errors.lastname ? "true" : "false"}/>
                    </div>
                    <div className='col-12 d-flex justify-content-center mt-2'>
                        <input type="password" placeholder='Password*' className='rounded-left col-5 create-user' name='input-password' {...register("pwd", {required: "Please, complete all the fieldes",})} aria-invalid={errors.pwd ? "true" : "false"}/>
                        <button className='col-3 rounded-right button-generate-random' type='button' onClick={generateRandomPassword}>Generate random</button>
                    </div>
                    <input type="email" placeholder='Email*' className='rounded mt-2 col-8 create-user' name='input-email' {...register("email", {required: "Please, complete all the fieldes",})}aria-invalid={errors.email ? "true" : "false"}/>
                    <button className='col-3 mt-3 rounded button-add-user'>Add user</button>
                    <div className='col-4 mt-3' id='container-messaje'>
                    {(errors.name || errors.pwd|| errors.lastname|| errors.username|| errors.email) && (
                        <div
                            className=" d-flex align-items-center justify-content-center rounded   p-3 error-message"
                            role="alert"
                        >
                            {errors.name != undefined
                            ? errors.name.message
                            : errors.pwd != undefined
                            ? errors.pwd.message
                            : errors.email != undefined
                            ? errors.email.message
                            : errors.lastname != undefined
                            ? errors.lastname.message
                            : errors.username.message}  
                        </div>
                    )}
                    {(!(errors.name || errors.pwd|| errors.lastname|| errors.username|| errors.email)&&errorEmailName)&&
                        <div className=' d-flex align-items-center justify-content-center rounded p-3 error-message'>
                            <stong>Email or user name already exists</stong>
                        </div>
                    }
                    {(!(errors.name || errors.pwd|| errors.lastname|| errors.username|| errors.email)&&user!=null)&&
                        
                        <div className=' d-flex align-items-center justify-content-center rounded p-3 good-message'>
                        <stong>The user has been create succsessfully <a href={`mailto:${user.email}?subject=You are registred in Space Manager&body=This is your user name: '${user.username}'. And this is your password: '${user.pwd}' `} onClick={(e)=>setUser(null)}> send email</a></stong>
                        </div>
                    }
                    </div>
                </div>

            </form>
        </main>
    )
}

export default CreateUser