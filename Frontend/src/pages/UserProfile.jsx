import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getMyProfilePosts, clearProfilePosts, getUsers } from '../slices/postSlice'
import ProfileContainer from '../components/ProfileContainer'
import Footer from '../components/Footer'

const UserProfile = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()

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

export default UserProfile
