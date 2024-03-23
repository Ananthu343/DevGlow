import React ,{useEffect}from 'react'
import LoginForm from '../components/userComponents/LoginForm'
import Footer from '../components/userComponents/Footer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Login = () => {
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
        backgroundImage: `url("https://img.freepik.com/premium-vector/cover-banner-working-desk-with-gadget-top-view-table-working-free-space-text_33771-1321.jpg")`,
        height: "100vh", 
        backgroundSize: "cover", 
        backgroundRepeat: "no-repeat", 
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
      }}>
        <LoginForm/>
      </div>
      <Footer/>
   </>
  )
}

export default Login
