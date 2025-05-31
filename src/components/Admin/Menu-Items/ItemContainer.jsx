import React from 'react'
import '../../../css/main.css'
const ItemContainer = (props) => {
  return (
    <div className='flex justify-between items-center w-[50px]'>
      <div className='menu-icon'>
        <img src={props.logo} alt="" />
      </div>
      <div className='menu-title text-white font-bold'>
        {props.title}
      </div>
    </div>
  )
}

export default ItemContainer
