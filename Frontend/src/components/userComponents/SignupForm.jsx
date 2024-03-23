import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { verifyEmail} from '../../slices/userSlice'
import toast from 'react-hot-toast'

const SignupForm = () => {
    const [username, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPass] = useState("")

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

    const isPasswordValid = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

    const isUsernameValid = (username) =>
    /^[a-zA-Z]{3,}$/.test(username);

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(!isEmail(email)){
            toast.error("Email is not valid")
        }else if(!isPasswordValid(password)){
            toast.error("Use a strong password")
        }else if(!isUsernameValid){
            toast.error("Username should contain only letters (minimum 3)")
        }else if(password !== confirmPassword){
            toast.error("Password didn't match")
        }else{
            const data = {
                username, email, password
            }
            dispatch(verifyEmail(data)).then((res)=>{
                if (res.meta.requestStatus === "rejected"){
                    const errorMessage = "Email not accepted";
                    toast.error(errorMessage);
                }else{
                    navigate("/verifying")
                }
            })
        }
        
    }

    return (
        <div className='bg-white p-8 rounded shadow-md w-96 backdrop-blur-lg bg-white/20'>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Register</h2>
            <form onSubmit={handleSubmit}>
                <p>Username</p>
                <input
                    value={username}
                    onChange={(e) => setName(e.target.value)}
                    type="text" placeholder="Sam" className="border border-gray-300 w-full p-2 mb-4 rounded" />

                <p>Email</p>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email" placeholder="samvipro@gmail.com" className="border border-gray-300 w-full p-2 mb-4 rounded" />

                <p>Password</p>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" placeholder="Password" className="border border-gray-300 w-full p-2 mb-4 rounded" />

                <p>Confirm password</p>
                <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    type="password" placeholder="Re-enter Password" className="border border-gray-300 w-full p-2 mb-4 rounded" />
                <button type="submit" className="w-full py-2 bg-[#004272] text-white rounded hover:bg-[#005f72] transition duration-200">Register</button>
            </form>
        </div>

    )
}

export default SignupForm
