import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const MenuBar = ({handleLogout}) => {
    const {userInfo} = useSelector(state=> state.auth)
    const navigate = useNavigate()
  return (
    <div className='absolute w-[200px] h-auto bg-white right-1 md:right-[80px] top-[55px] rounded shadow-lg lg:hidden p-3 flex flex-col justify-center items-center'>
        <div className='w-full h-auto p-1 flex items-center  mb-2'>
        <img className='border border-[#720058] w-7 rounded-full mr-2 lg:hidden' src="avatar.webp" alt="profile pic" />
        <div className='bg-[#979797] w-[1px] h-5'></div>
        <h3 className='ml-3 text-sm '>UserName</h3>
        </div>
        {
            userInfo ?
            <button onClick={()=>navigate('/profile')} className='w-full text-sm lg:hidden mb-2 hover:bg-gray-200'>My profile</button>
            : null
        }
        <div className='w-full bg-black h-[1px] mb-1'></div>
        {
            userInfo ?
            <button className=' text-sm lg:hidden w-full  hover:bg-gray-200 mb-2' onClick={handleLogout}>Logout</button>
            : <button className='text-sm lg:hidden mb-2 w-full  hover:bg-gray-200' onClick={() => navigate('/login')}>Login</button>
        }
        <div className='w-full bg-black h-[1px] mb-1'></div>
        {
            userInfo ?
            null
            : <button className='text-sm lg:hidden mb-2 w-full  hover:bg-gray-200' onClick={() => navigate('/signup')}>Register</button>
        }
    </div>
  )
}

export default MenuBar
