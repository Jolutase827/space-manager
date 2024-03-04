import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SpaceBlock from "./components/SpaceBlock";
import { useForm } from "react-hook-form";

const Space = ({ user, season }) => {
  const { id } = useParams();
  const [space, setSpace] = useState({ id: id, nombre: null, tipo: null });
  const [dialog, setDialog] = useState(false);
  const [reserves, setReserves] = useState([]);
  const diaDeHoy = new Date();
  const weeksLimit = new Date(diaDeHoy);
  const [horasMañanas, setHorasMañanas] = useState([]);
  const [horasTardes, setHorasTardes] = useState([]);
  const [festivos,setFestivos]=useState([]);
  weeksLimit.setDate(weeksLimit.getDate() + 14);
  useEffect(() => {
    fetch("http://localhost/Space Managment/servicioAulas/service.php?id=" + id)
      .then((response) => response.json())
      .then((data) => {
        setSpace({ id: data.id, nombre: data.nombre, tipo: data.tipo });
      });
  }, [id]);
  useEffect(() => {
    fetch(
      "http://localhost/Space Managment/servicioReservas/service.php?aula_id=" +
        id
    )
      .then((response) => response.json())
      .then((data) => {
        setReserves(data);
      });
  }, [reserves, id]);
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    let hora;
    let patios;
    fetch("http://localhost/Space Managment/servicioHoras/service.php")
      .then((response) => response.json())
      .then((data) => {
        hora = data;
      })
      .finally(() => {
        fetch("http://localhost/Space Managment/servicioPatios/service.php")
          .then((response) => response.json())
          .then((data) => {
            patios = data;
          })
          .finally(() => {
            console.log(hora);
            let horaAux = hora.inicio;
            let horasMañanasAux = [];
            let horasTardeAux = [];
            for (let i = 1; i <= hora.numero; i++) {
              if (horaTardeOMañana(horaAux)) {
                horasMañanasAux.push(
                  horaAux + "-" + horaSiguiente(horaAux, hora.espacio)
                );
                horasMañanas.push(
                  horaAux + "-" + horaSiguiente(horaAux, hora.espacio)
                );
              } else {
                horasTardeAux.push(
                  horaAux + "-" + horaSiguiente(horaAux, hora.espacio)
                );
              }
              horaAux = horaSiguiente(horaAux, hora.espacio);
              if (
                patios.filter((patio) => parseInt(patio.hora) === i)[0] !==
                undefined
              ) {
                if (horaTardeOMañana(horaAux)) {
                  horasMañanasAux.push(
                    horaAux +
                      "-" +
                      patioSiguiente(
                        horaAux,
                        patios.filter((patio) => parseInt(patio.hora) === i)[0]
                          .duracion
                      )
                  );
                  horasMañanas.push(
                    horaAux +
                      "-" +
                      patioSiguiente(
                        horaAux,
                        patios.filter((patio) => parseInt(patio.hora) === i)[0]
                          .duracion
                      )
                  );
                } else {
                  horasTardeAux.push(
                    horaAux +
                      "-" +
                      patioSiguiente(
                        horaAux,
                        patios.filter((patio) => parseInt(patio.hora) === i)[0]
                          .duracion
                      )
                  );
                }
                horaAux = patioSiguiente(
                  horaAux,
                  patios.filter((patio) => parseInt(patio.hora) === i)[0]
                    .duracion
                );
              }
            }
            setHorasMañanas(horasMañanasAux);
            setHorasTardes(horasTardeAux);
          });
      });
  }, []);


  useEffect(()=>{
    fetch('http://localhost/Space Managment/servicioFestivos/service.php')
    .then(response=>response.json())
    .then(data=>{
      setFestivos(data);
    })
    .catch(error=>console.log(error));
  },[]);


  const horaTardeOMañana = (horaAux) => {
    return parseInt(horaAux.substring(0, 2)) <= 12;
  };

  const horaSiguiente = (horaDeIncio, duracion) => {
    const hora = parseInt(horaDeIncio.substring(0, 2));
    const horaASumar = parseInt(duracion.substring(0, 2));
    const minuto = parseInt(horaDeIncio.substring(3, 5));
    const minutosAsumar = parseInt(duracion.substring(3, 5));
    let minutoAux = minuto + minutosAsumar;
    let horAux = 0;
    if (minutoAux >= 60) {
      horAux = 1;
      minutoAux = minutoAux - 60;
    }
    horAux += hora + horaASumar;
    return (
      (horAux.toString().length < 2 ? "0" : "") +
      horAux +
      ":" +
      (minutoAux.toString().length < 2 ? "0" : "") +
      minutoAux
    );
  };
  const patioSiguiente = (horaDeInicio, duracion) => {
    const hora = parseInt(horaDeInicio.substring(0, 2));
    const minuto = parseInt(horaDeInicio.substring(3, 5));
    const minutosAsumar = parseInt(duracion);
    let minutoAux = minuto + minutosAsumar;
    let horAux = 0;
    if (minutoAux >= 60) {
      horAux = 1;
      minutoAux = minutoAux - 60;
    }
    horAux += hora;
    return (
      (horAux.toString().length < 2 ? "0" : "") +
      horAux +
      ":" +
      (minutoAux.toString().length < 2 ? "0" : "") +
      minutoAux
    );
  };
  const onSubmit = (dataInput, e) => {
    const maybeReserveAux = [];
    let auxId;
    let diaAux;
    maybeReserve.forEach((reserve) => {
      for (let index = 0; index < dataInput.weeks; index++) {
        diaAux = new Date(reserve.dia.date);
        diaAux.setDate(diaAux.getDate() + index * 7);
        auxId =
          diaAux.getFullYear() +
          "-" +
          (diaAux.getMonth() + 1) +
          "-" +
          diaAux.getDate() +
          reserve.hora;
        maybeReserveAux.push({
          id: auxId,
          aula_id: space.id,
          usuario_id: dataInput.name,
        });
      }
    });
    doReserves(maybeReserveAux);
    setValue("name", "");
    setValue("weeks", 1);
    setDialog(false);
  };

  const doReserves = (maybeReserve) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "aplication/json",
      },
      body: JSON.stringify({ reservas: maybeReserve }),
    };
    fetch(
      "http://localhost/Space Managment/servicioReservas/service.php",
      options
    )
      .then((response) => response.json())
      .then((data) => {
        setMaybeReserve([]);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const removeById = (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "aplication/json",
      },
      body: JSON.stringify({ id: id }),
    };
    fetch(
      "http://localhost/Space Managment/servicioReservas/service.php",
      options
    )
      .then((response) => response.json())
      .then((data) => {
        alert("Se ha eliminado reserva");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const removeByGroup = (grupo_id) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "aplication/json",
      },
      body: JSON.stringify({ grupo_id: grupo_id }),
    };
    fetch(
      "http://localhost/Space Managment/servicioReservas/service.php",
      options
    )
      .then((response) => response.json())
      .then((data) => {
        alert("Se han eliminado las reservas");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const [maybeReserve, setMaybeReserve] = useState([]);
  const addMaybeReserve = (id, dia, hora) => {
    const maybeReserveAux = [
      ...maybeReserve,
      {
        id: id,
        aula_id: space.id,
        usuario_id: user.nombreUsuario,
        dia: dia,
        hora: hora,
      },
    ];
    setMaybeReserve(maybeReserveAux);
  };
  const removeMaybeReserve = (id) => {
    const maybeReserveAux = maybeReserve.filter((reserve) => reserve.id !== id);
    setMaybeReserve(maybeReserveAux);
  };
  const [dateCalendar, setDateCalendar] = useState(new Date(diaDeHoy));
  const textoEntresemana = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];
  const textoMeses = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [dias, setDias] = useState([]);
  const masUnaSemana = () => {
    if (user.admin === "1") {
      const dateAux = dateCalendar;
      dateAux.setDate(dateCalendar.getDate() + 7);
      setDateCalendar(dateAux);
      cambiarCalendario();
    } else {
      const dateAux = dateCalendar;
      dateAux.setDate(dateCalendar.getDate() + 7);
      console.log(dateAux);
      console.log(weeksLimit);
      if (dateAux <= weeksLimit) {
        setDateCalendar(dateAux);
        cambiarCalendario();
      } else {
        dateAux.setDate(dateCalendar.getDate() - 7);
      }
    }
  };
  const menosUnaSemana = () => {
    if (user.admin === "1") {
      const dateAux = dateCalendar;
      dateAux.setDate(dateCalendar.getDate() - 7);
      setDateCalendar(dateAux);
      cambiarCalendario();
    } else {
      const dateAux = dateCalendar;
      dateAux.setDate(dateCalendar.getDate() - 7);
      console.log(dateAux);
      console.log(diaDeHoy);
      if (
        dateAux.getDate() >= diaDeHoy.getDate() &&
        dateAux.getMonth() >= diaDeHoy.getMonth() &&
        dateAux.getFullYear() >= diaDeHoy.getFullYear()
      ) {
        setDateCalendar(dateAux);
        cambiarCalendario();
      } else {
        dateAux.setDate(dateAux.getDate() + 7);
      }
    }
  };
  const cambiarCalendario = () => {
    const diasActuales = [];
    const dateCambio = new Date(dateCalendar);
    for (
      let j = 1;
      j <= (dateCalendar.getDay() === 0 ? 7 : dateCalendar.getDay()) && j <= 5;
      j++
    ) {
      dateCambio.setDate(
        dateCalendar.getDate() -
          (dateCalendar.getDay() === 0 ? 7 : dateCalendar.getDay()) +
          j
      );
      diasActuales[j - 1] = {
        date:
          dateCambio.getFullYear() +
          "-" +
          (dateCambio.getMonth() + 1) +
          "-" +
          dateCambio.getDate(),
        string:
          textoEntresemana[dateCambio.getDay() - 1] +
          " " +
          dateCambio.getDate(),
      };
    }
    for (
      let i = (dateCalendar.getDay() === 0 ? 7 : dateCalendar.getDay()) + 1;
      i <= 5;
      i++
    ) {
      dateCambio.setDate(
        dateCalendar.getDate() +
          i -
          (dateCalendar.getDay() === 0 ? 7 : dateCalendar.getDay())
      );
      diasActuales[i] = {
        date:
          dateCambio.getFullYear() +
          "-" +
          (dateCambio.getMonth() + 1) +
          "-" +
          dateCambio.getDate(),
        string:
          textoEntresemana[dateCambio.getDay() - 1] +
          " " +
          dateCambio.getDate(),
      };
    }
    setDias(diasActuales);
  };
  useEffect(cambiarCalendario, []);

  const [horas, setHoras] = useState(horasMañanas);
  const [isMañana, setisMañana] = useState(true);
  const cambiarHoras = () => {
    if (isMañana) {
      setHoras(horasTardes);
    } else {
      setHoras(horasMañanas);
    }
    setisMañana(!isMañana);
  };

  return (
    <main className="user-administration">
      {dialog && (
        <div className=" fixed top-0 w-[100%] h-[100vh] bg-gray-500/[.6] flex justify-center items-center">
          <div className="bg-white w-[30%] h-[50%] flex flex-col">
            <div className="flex justify-end w-[100%]">
              <i
                className="bi bi-x-lg me-3 mt-1 text-[30px] hover:text-black text-gray-700 cursor-pointer"
                onClick={(e) => setDialog(false)}
              ></i>
            </div>
            <h1 className="text-[30px] fw-semibold ms-4">Reserve: </h1>
            <form
              className="flex justify-center items-center flex-col"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mt-2">Write the name of the user</div>
              <input
                type="text"
                placeholder="User name*"
                className="rounded col-8 create-user "
                name="input-user-name"
                {...register("name", { required: "Please, complete the name" })}
                aria-invalid={errors.name ? "true" : "false"}
              />
              <div className="text-red-600 mt-1">
                {errors.name && errors.name.message}
              </div>
              <div className="mt-4 col-6 text-center">
                How many weeks do you want to reserve this pattern
              </div>
              <input
                type="number"
                min={1}
                placeholder="Weeks*"
                className="rounded col-8 create-user "
                name="input-user-name"
                {...register("weeks", {
                  required: "Please, complete the number of weeks ",
                })}
                aria-invalid={errors.weeks ? "true" : "false"}
              />
              <div className="text-red-600 mt-1">
                {errors.weeks && errors.weeks.message}
              </div>
              <button className="rounded-md bg-fuchsia-500 mt-3 text-white hover:bg-fuchsia-600 hover:shadow-fuchsia-600 p-2 col-3">
                Reserve
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="col-12 d-flex justify-content-between mb-4">
        <h1 className="ms-3 mt-2 title col-3 text-[40px]">
          Space {space.nombre}
        </h1>
      </div>
      <div className="h-[100px] flex items-center">
        <button
          className="w-[7.5%] bg-purple-500 rounded-md h-[40px] text-white hover:bg-purple-600 hover:transition transition ms-[3%]"
          onClick={cambiarHoras}
        >
          {isMañana ? "Mañanas" : "Tardes"}
        </button>
        {maybeReserve.length > 0 && (
          <>
            <button
              onClick={(e) => doReserves(maybeReserve)}
              className="w-[10%] ms-[2%] h-[50px] rounded-lg bg-pink-500 hover:transition transition hover:shadow-lg-pink-700 hover:bg-pink-700  text-white"
            >
              Reserve
            </button>
            {user.nombreUsuario === "root" && (
              <button
                onClick={(e) => setDialog(true)}
                className="w-[10%] ms-[1%] h-[50px] rounded-lg bg-pink-400 hover:transition transition hover:shadow-lg-pink-700 hover:bg-pink-600  text-white"
              >
                Reserve for
              </button>
            )}
          </>
        )}
      </div>
      <div className="flex justify-center flex-col items-center w-[100%]  col-12 mb-2">
        <h1>
          <i
            className="bi bi-chevron-left cursor-pointer hover:text-gray-400 hover:transition transition"
            onClick={menosUnaSemana}
          ></i>
          {textoMeses[dateCalendar.getMonth()] +
            " " +
            dateCalendar.getFullYear()}
          <i
            className="bi bi-chevron-right cursor-pointer hover:text-gray-400 hover:transition transition"
            onClick={masUnaSemana}
          ></i>
        </h1>
        <div className="flex col-8 flex-wrap justify-center mb-4 shadow-lg p-0 m-0">
          <div className="w-[16.6%] h-[6.25vh] border-black border-e-[1px] border-b-[1px] flex justify-center items-center"></div>
          {dias.map((dia, index) => (
            <div
              className="w-[16.6%] h-[6.25vh] border-b-[1px] border-black border-e-[1px] bg-violet-600 text-white fw-semibold flex justify-center items-center "
              key={index}
            >
              <div>{dia.string}</div>
            </div>
          ))}
          {horas.map((hora, hindex) => (
            <>
              <div
                className="w-[16.6%]  h-[6.25vh] border-b-[1px] bg-fuchsia-500 text-white fw-semibold border-black border-e-[1px] flex justify-center items-center "
                key={hora}
              >
                <div>{hora}</div>
              </div>
              {dias.map((dia, index) => (
                <SpaceBlock
                  dia={dia}
                  hora={hora}
                  diaDeHoy={diaDeHoy}
                  weeksLimit={weeksLimit}
                  reserves={reserves}
                  user={user}
                  maybeReserve={maybeReserve}
                  removeMaybeReserve={removeMaybeReserve}
                  addMaybeReserve={addMaybeReserve}
                  removeById={removeById}
                  removeByGroup={removeByGroup}
                  festivos={festivos}
                  key={index + hindex}
                />
              ))}
            </>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Space;
