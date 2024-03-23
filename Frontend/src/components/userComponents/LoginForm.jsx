import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../slices/userSlice';
import { setCredentials } from '../../slices/authSlice';

const LoginForm = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const dispatch = useDispatch()

    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(loginUser({email,password})).then((action)=>{
         if (action.meta.requestStatus === "rejected"){
             const errorMessage = "Invalid email or password";
             toast.error(errorMessage);
         } else {
             dispatch(setCredentials(action.payload));
         }
        })
    }
  return (
    <div className='bg-white p-8 rounded shadow-lg w-96 backdrop-blur-lg bg-white/20'>
            <h2 className="text-2xl font-bold mb-6 ">Login</h2>
            <form onSubmit={handleSubmit}>
                <p>Email</p>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email" placeholder="samvipro@gmail.com" className="border border-gray-300 w-full p-2 mb-4 rounded text-black" />

                <p>Password</p>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" placeholder="Password" className="border border-gray-300 w-full p-2 mb-4 rounded text-black" />

                <button type="submit" className="w-full py-2 bg-[#004272] text-white rounded hover:bg-[#005f72] transition duration-200">Register</button>
            </form>
        </div>

  )
}

export default LoginForm
