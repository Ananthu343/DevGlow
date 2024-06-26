import React, { useEffect } from 'react'
import ProfileContainer from '../components/ProfileContainer'
import Footer from '../components/Footer'
import { useSelector, useDispatch } from 'react-redux'
import { clearProfilePosts, getMyProfilePosts, getUsers } from '../slices/postSlice'


const MyProfile = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const userId = userInfo?.devGlowAccess._id

  useEffect(() => {
    dispatch(getMyProfilePosts(userId))
    dispatch(getUsers())

    return () => {
      dispatch(clearProfilePosts())
    }
  }, [dispatch, userId])

  return (
    <>
      <div className='w-full top-0 flex justify-center pt-[55px] mb-2'>
        <div className='h-auto w-full md:w-[85%] bg-white rounded-2xl shadow-lg'>
          <ProfileContainer userId={userId} />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default MyProfile
