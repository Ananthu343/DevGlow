import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const MenuBar = ({ handleLogout }) => {
    const { userInfo } = useSelector(state => state.auth)
    const navigate = useNavigate()
    return (
        <div className='absolute w-[200px] h-auto bg-white right-1 md:right-[80px] top-[55px] rounded shadow-lg lg:hidden p-3 flex flex-col justify-center items-center text-sm font-semibold'>
            {userInfo ? <div className='w-full h-auto p-1 flex items-center  mb-2'>
                <div className='border border-[#720058] rounded-full overflow-hidden mr-2 w-[30px] h-[30px] object-cover'>
                    <img className='' src={userInfo?.devGlowAccess.profile_url ? userInfo?.devGlowAccess.profile_url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSinUiRqVB94sfZZbtNZgPJswUTs4R7YDskvXfVjUSejKfQqAoMaedQBNfybdIdduiix4&usqp=CAU"} alt="profilepic" />
                </div>
                <div className='bg-[#979797] w-[1px] h-5'></div>
                <h3 className='ml-3 text-sm font-semibold'>{userInfo?.devGlowAccess.username}</h3>
            </div>:null}
            {
                userInfo ?
                    <button onClick={() => navigate('/')} className='w-full text-sm lg:hidden mb-2 hover:bg-gray-200'>Home</button>
                    : null
            }
            {userInfo ? <div className='w-full bg-black h-[1px] mb-1'></div> : null}
            {
                userInfo ?
                    <button onClick={() => navigate('/community')} className='w-full text-sm lg:hidden mb-2 hover:bg-gray-200'>Communities</button>
                    : null
            }
            {userInfo ? <div className='w-full bg-black h-[1px] mb-1'></div> : null}
            {
                userInfo ?
                    <button onClick={() => navigate('/messages')} className='w-full text-sm lg:hidden mb-2 hover:bg-gray-200'>Messages</button>
                    : null
            }
            {userInfo ? <div className='w-full bg-black h-[1px] mb-1'></div> : null}
            {
                userInfo ?
                    <button onClick={() => navigate('/leaderboard')} className='w-full text-sm lg:hidden mb-2 hover:bg-gray-200'>Leaderboard</button>
                    : null
            }
            {userInfo ? <div className='w-full bg-black h-[1px] mb-1'></div> : null}
            {
                userInfo ?
                    <button onClick={() => navigate('/profile')} className='w-full text-sm lg:hidden mb-2 hover:bg-gray-200'>My profile</button>
                    : null
            }
            {userInfo ? <div className='w-full bg-black h-[1px] mb-1'></div> : null}
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
