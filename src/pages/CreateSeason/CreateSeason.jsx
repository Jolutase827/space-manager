import axios from "axios";
import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CreateSeason = ({addSeason}) => {
  const [hora, setHora] = useState(null);
  const [patios, setPatios] = useState([]);
  const [horas, setHoras] = useState([]);
  const [pasarACurso,setPasarACurso]=useState(false);
  const navigate = useNavigate();
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const crearCurso = (dataInput, e)=>{
    let options= {
      method: 'POST',
      headers:{
          'Content-Type': 'aplication/json',
      },
      body: JSON.stringify({"numero":hora.numero,"espacio":hora.espacio,"inicio":hora.inicio})
  };
  fetch('https://localhost/Space Managment/servicioHoras/service.php',options)
  .catch(error=>console.error(error))
  .finally(()=>{
    let option= {
      method: 'POST',
      headers:{
          'Content-Type': 'aplication/json',
      },
      body: JSON.stringify({"inicio":dataInput.curso_inicio,"fin":dataInput.curso_fin})
  };
  fetch('http://localhost/Space Managment/servicioCursos/service.php',option)
  .catch(error=>console.error(error))
  .finally(()=>{
    addSeason({"inicio":dataInput.curso_inicio,"fin":dataInput.curso_fin});
    navigate("/rootInterface/seasons");
  });
  });
  }
  const onSubmitPatio = (dataInput, e) => {
    const options= {
      method: 'POST',
      headers:{
          'Content-Type': 'aplication/json',
      },
      body: JSON.stringify({"hora":dataInput.hora_patio,"duracion":dataInput.duaracion_patio })
  };
  fetch('http://localhost/Space Managment/servicioPatios/service.php',options)
  .catch(error=>console.error(error))
  .finally(()=>{
    const horasAux = horas.filter(horaHoras=>horaHoras.numero!=dataInput.hora_patio)
    setPatios([...patios,{hora:dataInput.hora_patio,duracion:dataInput.duaracion_patio}]);
    setHoras(horasAux);
    console.log({hora:dataInput.hora_patio,duracion:dataInput.duaracion_patio});
    setValue('hora_patio','');
  });
  };
  
  const onSubmit = (dataInput, e) => {
    setHora({
      numero: dataInput.numero,
      espacio: dataInput.duracion,
      inicio: dataInput.inicio,
    });
    const horasAux = [];
    for (let i = 1; i <= dataInput.numero; i++) {
      horasAux.push({ numero: i });
    }
    setHoras(horasAux);
  };
  useEffect(() => {
    setValue("inicio", "07:00");
    setValue("numero", 1);
    setValue("duracion", "00:20");
  }, []);
  return (
    <main className="user-administration">
      <div className="col-12 d-flex justify-content-between">
        <h1 className="ms-3 mt-2 title col-3 text-[40px]">Create Season</h1>
      </div>
      {hora === null ? (
        <div className="d-flex items-center flex-col col-12">
          <h4 className="mt-4 text-center col-12">Horas</h4>
          <form
            className="w-[600px] rounded-md d-flex items-center flex-col h-[40vh] bg-slate-400"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h6 className="mt-3">Hora de inicio de jornada</h6>
            <input
              type="time"
              min="07:00"
              max="10:00"
              name="inicio"
              {...register("inicio")}
              required
            />
            <h6 className="mt-3">Número de horas</h6>
            <input
              type="number"
              name="numero"
              min={1}
              max={12}
              {...register("numero")}
              required
            />
            <h6 className="mt-3">Duración de cada hora</h6>
            <input
              type="time"
              min="00:20"
              max="01:10"
              name="duracion"
              required
              {...register("duracion")}
            />
            <button className="bg-purple-700 p-3 text-white mt-2 rounded-md hover:bg-purple-500">
              Siguiente
            </button>
          </form>
        </div>
      ) : (!pasarACurso)? (
        <div className="d-flex items-center flex-col col-12">
          <h4 className="mt-4 text-center col-12">Patios</h4>
          <div className="w-[600px] rounded-md d-flex items-center flex-col bg-slate-300 mb-3 ">
            {
              patios.map((patio,index)=>(
                <div key={index} className="w-[60%] bg-slate-500 rounded-md mt-2 mb-2">
                  <h6>Hora del patio: {patio.hora}</h6>
                  <h6>Duración del patio: {patio.duracion} min.</h6>
                </div>
              ))
            }
          </div>
          <form
            className="w-[600px] rounded-md d-flex items-center flex-col h-[28vh] bg-slate-400"
            onSubmit={handleSubmit(onSubmitPatio)}
          >
            <h6 className="mt-3">Hora del patio</h6>
            <select {...register("hora_patio")} required>
              {horas.map((horapatio) => (
                <option key={horapatio.numero} value={horapatio.numero}>
                  {horapatio.numero}
                </option>
              ))}
            </select>
            <h6 className="mt-3">Duración de cada patio en minutos</h6>
            <input
              type="number"
              name="numero"
              min={5}
              max={50}
              {...register("duaracion_patio")}
              required
            />
            <button className="bg-purple-700 p-3 text-white mt-2 rounded-md hover:bg-purple-500">
              Añadir
            </button>
          </form>
          <button className="bg-pink-700 p-3 text-white mt-5 rounded-md hover:bg-pink-500" onClick={(e)=>setPasarACurso(true)}>
            Siguiente
          </button>
        </div>
      ):
      (<div className="d-flex items-center flex-col col-12">
      <h4 className="mt-4 text-center col-12">Curso</h4>
      <form
        className="w-[600px] rounded-md d-flex items-center flex-col h-[40vh] bg-slate-400"
        onSubmit={handleSubmit(crearCurso)}
      >
        <h6 className="mt-3">Fecha de inicio</h6>
        <input
          type="date"
          {...register("curso_inicio")}
          required
        />
        <h6 className="mt-3">Fecha de fin</h6>
        <input
          type="date"
          {...register("curso_fin")}
          required
        />
        <button className="bg-purple-700 p-3 text-white mt-2 rounded-md hover:bg-purple-500">
          Crear curso
        </button>
      </form>
    </div>)
    }
    </main>
  );
};

export default CreateSeason;
