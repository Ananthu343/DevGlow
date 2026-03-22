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
      <div className="w-full max-w-7xl mx-auto pt-[85px] px-4 flex justify-center mb-8">
        <div className="w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-soft border border-slate-100 overflow-hidden">
          <ProfileContainer userId={userId} />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default MyProfile
