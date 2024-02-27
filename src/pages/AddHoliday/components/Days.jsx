import React from 'react'

const Days = (month,today) => {

  return (
    (month.date.getDate() == today.getDate()&&month.date.getMonth() == today.getMonth()&&month.date.getFullYear() == today.getFullYear())?(<div className='text-black w-[14.28%] h-[12,5%] flex justify-center items-center hover:shadow-sm hover:transition transition'><h4 className='p-2 bg-blue-600 text-white rounded-full'>{month.dia}</h4></div>):(<div className='text-black w-[14.28%] h-[12,5%] flex justify-center items-center hover:shadow-sm hover:transition transition'><h4>{month.dia}</h4></div>)
          
  )
}

export default Days