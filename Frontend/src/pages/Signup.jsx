import React, { useEffect } from 'react'
import SignupForm from '../components/SignupForm'
import Footer from '../components/Footer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const { userInfo } = useSelector(state => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo) {
      navigate("/")
    }
  }, [userInfo, navigate])
  return (
    <>
      <div className="min-h-screen pt-16 flex items-center justify-center bg-slate-50 relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-200/40 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-200/40 rounded-full blur-3xl opacity-60"></div>
        
        <div className="z-10 w-full max-w-md px-4 mt-8 mb-16">
          <SignupForm />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Signup
