import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { loginUser } from '../slices/userSlice';
import { setCredentials } from '../slices/authSlice';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password })).then((action) => {
            if (action.meta.requestStatus === "rejected") {
                const errorMessage = "Invalid email or password";
                toast.error(errorMessage);
            } else {
                dispatch(setCredentials(action.payload));
            }
        })
    }
    return (
        <div className='bg-white/80 p-8 rounded-2xl shadow-glass border border-white/50 backdrop-blur-xl w-full'>
            <div className="flex flex-col items-center mb-8">
                <h2 className="text-2xl font-bold text-slate-800">Welcome back</h2>
                <p className="text-sm text-slate-500 mt-1">Please enter your details to sign in.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
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

                <div className="pt-2">
                    <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-100 transition-all shadow-sm">Sign In</button>
                </div>
            </form>
        </div>

    )
}

export default LoginForm
