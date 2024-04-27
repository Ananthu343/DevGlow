import React, { useState,useEffect } from 'react'
import { logoutUser } from '../slices/userSlice'
import { logout } from '../slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CreatePost from './CreatePost'
import MenuBar from './MenuBar'
import SearchBox from './SearchBox'

const Header = () => {
  const [modal, setModal] = useState(false)
  const [searchBox, setSearchBox] = useState(false)
  const [activeIcon, setActiveIcon] = useState(null);
  const [menu,setOpenMenu] = useState(false)
  const [searchTerm, setSearchTerm] = useState('');
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
    <div className='fixed top-0 z-50 flex justify-center w-screen '>
      <div className='h-[50px] w-screen md:w-[85%] bg-white md:rounded-b-2xl top-0 z-50 self-center shadow-md flex p-3 flex justify-between'>
        <img src="logo.png" alt="" />
        <input onClick={()=>setSearchBox(true)} onChange={(e) => setSearchTerm(e.target.value)}  type="text" placeholder='Search' className='hidden md:flex border rounded-full border-[#720058] h-8 w-[250px] text-sm focus:outline-none focus:shadow-md bg-gray-100 pl-3' />
                                                              
        <div className='flex text-xs text-[#979797] w-[150px] lg:w-[300px] space-x-4 '>

          <div onClick={() => {
            navigate("/")
            setActiveIcon('icon1')
          }} className='cursor-pointer flex flex-col items-center justify-center w-[80px]'>
                <img className='w-6' src="Home.png" alt="home icon" />
                <h5 className='hidden lg:flex'>Home</h5>
                <div className={`hidden lg:flex line absolute mt-12 ${activeIcon === 'icon1' ? 'animate-icon1' : activeIcon === 'icon2' ? 'animate-icon2' : activeIcon === 'icon3' ? 'animate-icon3' : activeIcon === 'icon4' ? 'animate-icon4' : ''}`}></div>
                <div className={`lg:hidden smLine absolute mt-10 ${activeIcon === 'icon1' ? 'animate-smLine-icon1' : activeIcon === 'icon2' ? 'animate-smLine-icon2' : activeIcon === 'icon3' ? 'animate-smLine-icon3' : activeIcon === 'icon4' ? 'animate-smLine-icon4' : ''}`}></div>
          </div>

          <div onClick={() => {
            navigate("/community")
            setActiveIcon('icon2')
          }} className='cursor-pointer flex flex-col items-center justify-center w-[80px] mt-1'>
                <img className='w-5' src="community.png" alt="community icon" />
                <h5 className='hidden lg:flex'>Communities</h5>
          </div>

          <div onClick={() => {
            navigate("/messages")
            setActiveIcon('icon3')
          }} className='cursor-pointer flex flex-col items-center justify-center w-[80px]'>
                <img className='w-6' src="message.jpg" alt="messsage icon" />
                <h5 className='hidden lg:flex'>Messages</h5>
          </div>

          <div onClick={() => {
            navigate("/leaderboard")
            setActiveIcon('icon4')
          }} className='cursor-pointer flex flex-col items-center justify-center w-[80px] mb-1'>
                <img className='w-7' src="Leaderboard.png" alt="leaderboard icon" />
                <h5 className='hidden lg:flex'>Leaderboard</h5>
          </div>

        </div>
        <div onClick={handleModal} className='cursor-pointer flex flex-col items-center justify-center w-[80px] text-xs text-[#979797]'>
                <img className='w-6' src="create.webp" alt="leaderboard icon" />
                <h5 className='hidden lg:flex'>Create</h5>
          </div>
          <button className=' lg:hidden' onClick={() => setOpenMenu(!menu)}>
        {menu ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>
        {menu && <MenuBar handleLogout={handleLogout}/>}
        {
          userInfo ?
            <button className='hidden text-sm lg:flex' onClick={handleLogout}>Logout</button>
            : <button className='hidden text-sm lg:flex' onClick={() => navigate('/login')}>Login</button>
        }
        {
          userInfo ?
            <button className='bg-[#720058] text-white w-[80px] rounded-full text-sm x hidden lg:flex justify-center items-center' onClick={() => navigate('/profile')}>Profile</button>
            : <button className='bg-[#720058] text-white w-[80px] rounded-full text-sm hidden lg:flex justify-center items-center' onClick={() => navigate('/signup')}>Register</button>
        }
        <div className='bg-[#979797] w-[1px] hidden lg:flex'></div>
        <img className='border border-[#720058] w-7 rounded-full mr-2 hidden lg:flex' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSinUiRqVB94sfZZbtNZgPJswUTs4R7YDskvXfVjUSejKfQqAoMaedQBNfybdIdduiix4&usqp=CAU" alt="profile pic" />
        
      </div>
    </div>
    {modal ? 
      <CreatePost setModal={setModal}/>
 : null}
 {searchBox ? 
      <SearchBox setSearchBox={setSearchBox} searchTerm={searchTerm}/>
 : null}
    </>
  )
}

export default Header
