import React, { useEffect, useState } from 'react'

const AddHoliday = () => {
    const today = new Date();
  const [date, setDate] = useState(today);
  const [months, setMonths] = useState([]);
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
  const menosUnMes =()=>{
    const dateAux = new Date(date);
    dateAux.setMonth(dateAux.getMonth()-1);
    setDate(dateAux);
    colocateDays();
  }
  const masUnMes =()=>{
    const dateAux = new Date(date);
    dateAux.setMonth(dateAux.getMonth()+1);
    setDate(dateAux);
    colocateDays();
  }
  const colocateDays = () => {
    const monthAux = [];
    const day1 = new Date(date.getFullYear() + '-' + (date.getMonth() + 1) + '-1');
    let aux = new Date(day1);
    let contador = 0;
    for (let i = 1; i <= (day1.getDay() === 0 ? 7 : day1.getDay()) && i <= 5; i++) {
      aux.setDate(day1.getDate() - (day1.getDay() === 0 ? 7 : day1.getDay()) + i);
      monthAux[i - 1] = { string: aux.getFullYear() + '-' + (aux.getMonth() + 1) + '-' + aux.getDate(), date: new Date(aux), dia: aux.getDate() };
      contador++;
      aux = new Date(day1);
    }
    for (let j = contador; j <= 42; j++) {
      monthAux[j - 1] = { string: day1.getFullYear() + '-' + (day1.getMonth() + 1) + '-' + day1.getDate(), date: new Date(day1), dia: day1.getDate() };
      day1.setDate(day1.getDate() + 1);
    }
    setMonths(monthAux);
  };

  useEffect(colocateDays, [date]);

  return (
    <main className="user-administration">
      <div className="col-12 d-flex justify-content-between">
        <h1 className="ms-3 mt-2 title col-3 text-[40px]">Season</h1>
      </div>
      <div className='col-12 flex justify-center'>
        <div className='col-7 flex flex-wrap h-[70vh] shadow-md'>
          <h1 className='col-12 text-center flex justify-center h-[12,5%] items-center'>
            <i
            className="bi bi-chevron-left cursor-pointer hover:text-gray-400 hover:transition transition"
            onClick={(e)=>{menosUnMes();}}
            ></i>
            <div className='col-4'>{textoMeses[date.getMonth()]}-{date.getFullYear()}</div>
            <i
              className="bi bi-chevron-right cursor-pointer hover:text-gray-400 hover:transition transition"
              onClick={(e)=>{masUnMes();}}
            ></i>
          </h1>
          <div className='text-black w-[14.28%] h-[12,5%] flex justify-center items-center'><h5>Monday</h5></div>
          <div className='text-black w-[14.28%] h-[12,5%] flex justify-center items-center'><h5>Tuesday</h5></div>
          <div className='text-black w-[14.28%] h-[12,5%] flex justify-center items-center'><h5>Wednesday</h5></div>
          <div className='text-black w-[14.28%] h-[12,5%] flex justify-center items-center'><h5>Thursday</h5></div>
          <div className='text-black w-[14.28%] h-[12,5%] flex justify-center items-center'><h5>Friday</h5></div>
          <div className='text-black w-[14.28%] h-[12,5%] flex justify-center items-center'><h5>Saturday</h5></div>
          <div className='text-black w-[14.28%] h-[12,5%] flex justify-center items-center'><h5>Sunday</h5></div>
          {months.map((month,index) => 
            (month.date.getDate() == today.getDate()&&month.date.getMonth() == today.getMonth()&&month.date.getFullYear() == today.getFullYear())?(<div className='text-black w-[14.28%] cursor-pointer h-[12,5%] flex justify-center items-center hover:shadow-md hover:transition transition' key={index}><h4 className='p-2 bg-blue-600 text-white rounded-full cursor-pointer'>{month.dia}</h4></div>):(month.date.getDay()===6||month.date.getDay()===0)?(<div className=' text-slate-500 w-[14.28%] h-[12,5%] flex justify-center items-center' key={index}><h4>{month.dia}</h4></div>):(<div className=' cursor-pointer w-[14.28%] h-[12,5%] flex justify-center items-center hover:shadow-md hover:transition transition' key={index}><h4>{month.dia}</h4></div>)
          
          )}
        </div>
      </div>
    </main>
  );
}

export default AddHoliday