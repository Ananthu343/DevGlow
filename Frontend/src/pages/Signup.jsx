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
        backgroundImage: `url("https://ideas.ted.com/wp-content/uploads/sites/3/2017/09/featured_art_istock_work_home.jpg")`,
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
