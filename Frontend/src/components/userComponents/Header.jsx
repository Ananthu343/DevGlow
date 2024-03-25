import React, { useState,useEffect } from 'react'
import { logoutUser } from '../../slices/userSlice'
import { logout } from '../../slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CreatePost from './CreatePost'

const Header = () => {
  const [modal, setModal] = useState(false)
  const [activeIcon, setActiveIcon] = useState(null);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.auth)

  useEffect(()=>{
    if (!userInfo) {
      setActiveIcon(null)
    }
  },[userInfo,activeIcon])
  
  const handleLogout = () => {
    dispatch(logoutUser()).then((res) => {
      dispatch(logout());
      navigate('/login')
    })
  }

  const handleModal = () => {
    if (userInfo) {
      setModal(!modal)
    } else {
      navigate('/login');
    }
  }

  return (
    <>
    <div className='flex justify-center fixed top-0 z-50 w-screen'>
      <div className='h-[50px] w-[85%] bg-white rounded-b-2xl top-0 z-50 self-center shadow-md flex p-3 flex justify-between'>
        <img src="logo.png" alt="" />
        <input type="text" placeholder='Search' className='border rounded border-[#720058] h-8 w-[250px] text-sm focus:outline-none focus:shadow-md bg-gray-100 pl-3' />
        <div onClick={handleModal} className='cursor-pointer flex flex-col items-center justify-center w-[80px] text-xs text-[#979797]'>
          <img className='w-6' src="create.webp" alt="create icon" />
          <h5>Create</h5>
        </div>
        <div className='bg-[#979797] w-[1px]'></div>
        <div className='flex text-xs text-[#979797] w-[300px] space-x-4 '>

          <div onClick={() => {
            navigate("/")
            setActiveIcon('icon1')
          }} className='cursor-pointer flex flex-col items-center justify-center w-[80px]'>
                <img className='w-6' src="Home.png" alt="home icon" />
                <h5>Home</h5>
                <div className={`line absolute mt-12 ${activeIcon === 'icon1' ? 'animate-icon1' : activeIcon === 'icon2' ? 'animate-icon2' : activeIcon === 'icon3' ? 'animate-icon3' : activeIcon === 'icon4' ? 'animate-icon4' : ''}`}></div>
          </div>

          <div onClick={() => {
            navigate("/community")
            setActiveIcon('icon2')
          }} className='cursor-pointer flex flex-col items-center justify-center w-[80px] mt-1'>
                <img className='w-5' src="community.png" alt="community icon" />
                <h5>Communities</h5>
          </div>

          <div onClick={() => {
            navigate("/messages")
            setActiveIcon('icon3')
          }} className='cursor-pointer flex flex-col items-center justify-center w-[80px]'>
                <img className='w-6' src="message.jpg" alt="messsage icon" />
                <h5>Messages</h5>
          </div>

          <div onClick={() => {
            navigate("/leaderboard")
            setActiveIcon('icon4')
          }} className='cursor-pointer flex flex-col items-center justify-center w-[80px] mb-1'>
                <img className='w-7' src="Leaderboard.png" alt="leaderboard icon" />
                <h5>Leaderboard</h5>
          </div>

        </div>
        {
          userInfo ?
            <button className='text-sm' onClick={handleLogout}>Logout</button>
            : <button className='text-sm' onClick={() => navigate('/login')}>Login</button>
        }
        {
          userInfo ?
            <button className='bg-[#720058] text-white w-[90px] rounded-full text-sm' onClick={() => navigate('/profile')}>Profile</button>
            : <button className='bg-[#720058] text-white w-[90px] rounded-full text-sm' onClick={() => navigate('/signup')}>Register</button>
        }
        <div className='bg-[#979797] w-[1px]'></div>
        <img className='border border-[#720058] w-7 rounded-full mr-2' src="avatar.webp" alt="profile pic" />
        
      </div>
    </div>
    {modal ? 
      <CreatePost setModal={setModal}/>
 : null}
    </>
  )
}

export default Header
