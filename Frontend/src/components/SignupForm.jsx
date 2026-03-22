import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { verifyEmail } from '../slices/userSlice'
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
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,}$/.test(password);

    const isUsernameValid = (username) =>
        /^\S[a-zA-Z]{3,}$/.test(username);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!isEmail(email)) {
            toast.error("Email is not valid")
        } else if (!isPasswordValid(password)) {
            toast.error(
                "Password should follow these conditions, \n\n Is at least 5 characters long.\nContains at least one lowercase letter.\nContains at least one uppercase letter.\nContains at least one digit.\nConsists only of letters (uppercase or lowercase) and digits.",
                {
                    duration: 6000,
                }
            );
        } else if (!isUsernameValid) {
            toast.error("Username should contain only letters (minimum 3)")
        } else if (password !== confirmPassword) {
            toast.error("Password didn't match")
        } else {
            const data = {
                username, email, password
            }
            dispatch(verifyEmail(data)).then((res) => {
                if (res.meta.requestStatus === "rejected") {
                    const errorMessage = "Email not accepted";
                    toast.error(errorMessage);
                } else {
                    navigate("/verifying")
                }
            })
        }

    }

    return (
        <div className='bg-white/80 p-8 rounded-2xl shadow-glass border border-white/50 backdrop-blur-xl w-full'>
            <div className="flex flex-col items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Create Account</h2>
                <p className="text-sm text-slate-500 mt-1">Sign up to get started.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
                    <input
                        value={username}
                        onChange={(e) => setName(e.target.value)}
                        type="text" placeholder="Sam" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-slate-800 outline-none" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email" placeholder="samvipro@gmail.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-slate-800 outline-none" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-slate-800 outline-none" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                    <input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPass(e.target.value)}
                        type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-slate-800 outline-none" />
                </div>
                <div className="pt-2">
                    <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-100 transition-all shadow-sm">Register</button>
                </div>
            </form>
        </div>

    )
}

export default SignupForm
