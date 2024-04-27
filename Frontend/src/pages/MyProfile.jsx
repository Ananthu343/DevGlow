import React from 'react'
import ProfileContainer from '../components/ProfileContainer'
import Footer from '../components/Footer'
import { useSelector } from 'react-redux'
 

const MyProfile = () => {
  const {userInfo} = useSelector((state)=>state.auth)
    const userId= userInfo.devGlowAccess._id
  return (
    <>
    <div className='w-full top-0 flex justify-center pt-[55px] mb-2'>
      <div className='h-auto w-full md:w-[85%] bg-white rounded-2xl shadow-lg'>
             <ProfileContainer userId={userId}/>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default MyProfile
