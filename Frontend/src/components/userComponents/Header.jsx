import React from 'react'
import { logoutUser } from '../../slices/userSlice'
import { logout } from '../../slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const Header = () => {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logoutUser()).then((res) => {
          dispatch(logout());
          navigate('/login')
        })
      }
    
  return (
    <div className='flex justify-center fixed top-0 z-50 w-screen'>
      <div className='h-[50px] w-[80%] bg-white rounded-b-2xl top-0 z-50 self-center shadow-md'>
            <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Header
