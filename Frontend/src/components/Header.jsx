import React, { useState, useEffect } from 'react'
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
  const [menu, setOpenMenu] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.auth)

  useEffect(() => {
    if (!userInfo) {
      setActiveIcon(null)
    }
  }, [userInfo, activeIcon])

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
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
      <div className='fixed top-0 z-[100] flex justify-center w-screen '>
        <div className='h-[65px] w-screen md:w-[85%] bg-white/85 backdrop-blur-lg md:rounded-b-2xl top-0 z-50 self-center shadow-soft border-b md:border border-slate-200 flex px-6 py-2 items-center justify-between transition-all'>
          <img onClick={() => navigate('/')} src="logo.png" alt="logo" className='cursor-pointer h-8 object-contain' />
          <input onClick={() => setSearchBox(true)} onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder='Search' className='flex border-none rounded-full bg-slate-100/80 text-slate-800 h-10 w-[150px] lg:w-[250px] text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 px-5 transition-shadow' />

          <div className='flex text-xs text-[#979797] w-[150px] lg:w-[300px] space-x-4 '>

            <div onClick={() => {
              navigate("/")
              setActiveIcon('icon1')
            }} className={`cursor-pointer hidden lg:flex flex-col items-center justify-center w-[80px] transition-colors ${activeIcon === 'icon1' ? 'text-slate-900' : 'opacity-70 hover:opacity-100 hover:text-slate-900'}`}>
              <img className='w-6 ' src="Home.png" alt="home icon" />
              <h5 className='hidden lg:flex font-medium mt-1'>Home</h5>
              <div className={`hidden lg:flex line absolute mt-12 ${activeIcon === 'icon1' ? 'animate-icon1' : activeIcon === 'icon2' ? 'animate-icon2' : activeIcon === 'icon3' ? 'animate-icon3' : activeIcon === 'icon4' ? 'animate-icon4' : ''}`}></div>
            </div>

            <div onClick={() => {
              navigate("/community")
              setActiveIcon('icon2')
            }} className={`cursor-pointer hidden lg:flex flex-col items-center justify-center w-[80px] mt-1 transition-colors ${activeIcon === 'icon2' ? 'text-slate-900' : 'opacity-70 hover:opacity-100 hover:text-slate-900'}`}>
              <img className='w-5 ' src="community.png" alt="community icon" />
              <h5 className='hidden lg:flex font-medium mt-1'>Communities</h5>
            </div>

            <div onClick={() => {
              navigate("/messages")
              setActiveIcon('icon3')
            }} className={`cursor-pointer hidden lg:flex flex-col items-center justify-center w-[80px] transition-colors ${activeIcon === 'icon3' ? 'text-slate-900' : 'opacity-70 hover:opacity-100 hover:text-slate-900'}`}>
              <img className='w-6 ' src="message.jpg" alt="messsage icon" />
              <h5 className='hidden lg:flex font-medium mt-1'>Messages</h5>
            </div>

            <div onClick={() => {
              navigate("/leaderboard")
              setActiveIcon('icon4')
            }} className={`cursor-pointer hidden lg:flex flex-col items-center justify-center w-[80px] mb-1 transition-colors ${activeIcon === 'icon4' ? 'text-slate-900' : 'opacity-70 hover:opacity-100 hover:text-slate-900'}`}>
              <img className='w-7' src="Leaderboard.png" alt="leaderboard icon" />
              <h5 className='hidden lg:flex font-medium mt-1'>Leaderboard</h5>
            </div>

          </div>
          <div onClick={handleModal} className='pr-3 cursor-pointer flex flex-col items-center justify-center w-[80px] text-xs text-[#979797] transition-all opacity-70 hover:opacity-100 hover:text-slate-900'>
            <img className='w-6' src="create.webp" alt="leaderboard icon" />
            <h5 className='hidden lg:flex font-medium mt-1'>Create</h5>
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
          {menu && <MenuBar handleLogout={handleLogout} />}
          {
            userInfo ?
              <button className='hidden text-sm lg:flex hover:text-red-500 font-medium transition-colors' onClick={handleLogout}>Logout</button>
              : <button className='hidden text-sm lg:flex hover:text-slate-900 font-medium transition-colors' onClick={() => navigate('/login')}>Login</button>
          }
          {
            userInfo ?
              <button className='bg-slate-900 hover:bg-slate-800 transition-colors text-white w-[80px] h-[36px] rounded-full text-sm hidden lg:flex justify-center items-center shadow-sm' onClick={() => navigate('/profile')}>Profile</button>
              : <button className='bg-slate-900 hover:bg-slate-800 transition-colors text-white w-[80px] h-[36px] rounded-full text-sm hidden lg:flex justify-center items-center shadow-sm' onClick={() => navigate('/signup')}>Register</button>
          }
          <div className='bg-slate-200 w-[1px] h-6 self-center hidden lg:flex'></div>
          {!userInfo?.devGlowAccess.roles.includes("admin") ?
            <div className='hidden lg:flex border border-slate-300 rounded-full overflow-hidden mr-2 w-[36px] h-[36px] object-cover shadow-sm'>
              <img className="w-full h-full object-cover" src={userInfo?.devGlowAccess.profile_url ? userInfo?.devGlowAccess.profile_url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSinUiRqVB94sfZZbtNZgPJswUTs4R7YDskvXfVjUSejKfQqAoMaedQBNfybdIdduiix4&usqp=CAU"} alt="profilepic" />
            </div> :
            <div className='relative hidden lg:flex border border-slate-300 rounded-full overflow-hidden mr-2 w-[36px] h-[36px] object-cover cursor-pointer shadow-sm' onMouseEnter={() => setShowButton(true)} onMouseLeave={() => setShowButton(false)}>
              {/* Image Container */}
              <div className={`absolute inset-0 ${showButton ? 'transform rotateY-180' : ''}`}>
                <img
                  src={userInfo?.devGlowAccess.profile_url ? userInfo?.devGlowAccess.profile_url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSinUiRqVB94sfZZbtNZgPJswUTs4R7YDskvXfVjUSejKfQqAoMaedQBNfybdIdduiix4&usqp=CAU"}
                  alt="profilepic"
                  className="object-cover w-full h-full transform transition-transform duration-500 ease-in-out"
                />
              </div>
              {/* Button Container */}
              <div className={`absolute inset-0 flex items-center justify-center ${showButton ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 ease-in-out`}>
                <button onClick={() => navigate('/admin')} className="bg-slate-800 text-white w-full h-full rounded text-[10px] font-semibold">ADM</button>
              </div>
            </div>}
        </div>
      </div>
      {modal ?
        <CreatePost setModal={setModal} />
        : null}
      {searchBox ?
        <SearchBox setSearchBox={setSearchBox} searchTerm={searchTerm} />
        : null}
    </>
  )
}

export default Header
