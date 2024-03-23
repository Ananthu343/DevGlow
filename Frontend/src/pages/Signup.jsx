import React, { useEffect } from 'react'
import SignupForm from '../components/userComponents/SignupForm'
import Footer from '../components/userComponents/Footer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const {userInfo} = useSelector(state=> state.auth)
    const navigate = useNavigate()

    useEffect(()=>{
        if (userInfo) {
            navigate("/")
        }
    },[userInfo,navigate])
  return (
   <>
    <div style={{ 
        top:0,
        backgroundImage: `url("https://c0.wallpaperflare.com/preview/506/555/733/career-leadership-success-businessman.jpg")`,
        height: "100vh", 
        backgroundSize: "cover", 
        backgroundRepeat: "no-repeat", 
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
      }}>
        <SignupForm/>
      </div>
      <Footer/>
   </>
  )
}

export default Signup
