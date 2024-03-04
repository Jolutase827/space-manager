import React from 'react'

const SpaceBlock = ({dia,hora,festivos,diaDeHoy,weeksLimit,reserves,user,maybeReserve,removeMaybeReserve,addMaybeReserve,removeById,removeByGroup}) => {
  let id = dia.date+hora;
  const diaDelEspacio = new Date(dia.date); 
  let selected= (maybeReserve.find(reserve=>reserve.id===id)===undefined);
  let  claseCompleta= `w-[16.6%] h-[6.25vh] border-b-[1px] ${selected ? 'text-black' : 'text-white'} border-black border-e-[1px] flex justify-center items-center hover:scale-105 hover:border-[1px] hover:shadow-md cursor-pointer ${selected ? 'bg-white' : 'bg-blue-500'} `;
  const haveReserve = reserves.find((reserve)=>reserve.id===id);
  if(haveReserve){
    claseCompleta = `w-[16.6%] fw-semibold flex-col h-[6.25vh] border-b-[1px] text-white border-black border-e-[1px] flex justify-center items-center hover:scale-105 hover:border-[1px] hover:shadow-md ${haveReserve.usuario_id===user.nombreUsuario?'bg-fuchsia-400':'bg-purple-400'}`;
  }
  
  if(diaDelEspacio>diaDeHoy){
    if(festivos.find(festivo=>festivo.dia===dia.date)!==undefined){
      return (
        <div className={'w-[16.6%] fw-semibold flex-col h-[6.25vh] border-b-[1px] text-white border-black border-e-[1px] flex justify-center items-center hover:scale-105 hover:border-[1px] hover:shadow-md bg-slate-500'}>
            Holiday
        </div>
      )
    }else if(diaDelEspacio<weeksLimit||user.admin==='1'){
    return (
      <div className={claseCompleta} onClick={(e)=>haveReserve===undefined&&((selected)?addMaybeReserve(id,dia,hora):removeMaybeReserve(id))}>
          <div>{selected?(haveReserve?haveReserve.usuario_id:'Free'):'Selected'}</div>
          {!!haveReserve&&(haveReserve.usuario_id===user.nombreUsuario||user.nombreUsuario==='root')?(<div className='flex justify-around w-[30%]'><i className="bi bi-trash cursor-pointer hover:text-red-500" onClick={(e)=>removeById(haveReserve.id)}></i><i onClick={(e)=>removeByGroup(haveReserve.grupo_id)} className="bi bi-calendar-x cursor-pointer hover:text-red-500"></i></div>):''}
      </div>
    )
    }else{
      return (
        <div className={'w-[16.6%] fw-semibold flex-col h-[6.25vh] border-b-[1px] text-white border-black border-e-[1px] flex justify-center items-center hover:scale-105 hover:border-[1px] hover:shadow-md bg-slate-500'}>
            <div>Not permissions</div>
        </div>
      )
    }
  }else{
    return (
      <div className={'w-[16.6%] fw-semibold flex-col h-[6.25vh] border-b-[1px] text-white border-black border-e-[1px] flex justify-center items-center hover:scale-105 hover:border-[1px] hover:shadow-md bg-slate-500'}>
          {(user.admin==='1'&&haveReserve)?(<><div>Reserved by: </div><div>{haveReserve.usuario_id}</div></>):(<div>Passed</div>)}
      </div>
    )
  }
  
}

export default SpaceBlock