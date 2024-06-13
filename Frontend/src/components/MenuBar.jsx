import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types'

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
            </div> : null}
            {
                userInfo ?
                    <button className=' text-sm lg:hidden w-full  hover:bg-gray-200 mb-2' onClick={() => navigate('/profile')}>My profile</button>
                    : null
            }
            <div className='w-full bg-black h-[1px] mb-1'></div>
            {
                userInfo ?
                    <button className=' text-sm lg:hidden w-full  hover:bg-gray-200 mb-2 text-red-500' onClick={handleLogout}>Logout</button>
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

MenuBar.propTypes = {
    handleLogout: PropTypes.func.isRequired
};

export default MenuBar
