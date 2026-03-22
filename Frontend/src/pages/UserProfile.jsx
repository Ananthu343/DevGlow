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
      <div className="w-full max-w-7xl mx-auto pt-[85px] px-4 flex justify-center mb-8">
        <div className="w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-soft border border-slate-100 overflow-hidden">
          <ProfileContainer userId={userId} />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default UserProfile
