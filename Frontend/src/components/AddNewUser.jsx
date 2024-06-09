import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { addNewUser } from '../slices/adminSlice'
import { pushIntoUsers } from '../slices/postSlice'

const AddNewUser = ({ setModal }) => {
    const { users } = useSelector(state => state.post)
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const isEmail = (email) =>
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

    const isPasswordValid = (password) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

    const isUsernameValid = (username) =>
        /^[a-zA-Z]{3,}$/.test(username);

    const handleSubmit = (e) => {
        e.preventDefault()
        if (users.find(ele => ele.email === email)) {
            toast.error("Email already exists")
        } else if (!isEmail(email)) {
            toast.error("Email is not valid")
        } else if (!isPasswordValid(password)) {
            toast.error("Use a strong password")
        } else if (!isUsernameValid) {
            toast.error("Username should contain only letters (minimum 3)")
        } else {
            dispatch(addNewUser({ username, email, password })).then((action) => {
                if (action.meta.requestStatus === "rejected") {
                    const errorMessage = "Something went wrong";
                    toast.error(errorMessage);
                } else {
                    toast.success("User added successfully")
                    console.log(action.payload);
                    dispatch(pushIntoUsers(action.payload))
                }
            })
        }
    }

    return (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
            <div className='absolute w-screen h-full bg-black/60 flex justify-center items-center z-[100] top-0'>
                <div className='bg-white rounded-[10px] w-[400px] h-auto p-3 flex flex-col justify-center text-[#720058] text-sm'>
                    <form onSubmit={handleSubmit}>
                        <div className='flex justify-between items-center mb-3'>
                            <h4 className='text-sm font-semibold'>Create post</h4>
                            <button onClick={() => setModal(false)}><img className='w-7' src="close.jpg" alt="close" /></button>
                        </div>
                        <p>Username</p>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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

                        <button type="submit" className="w-full py-2 bg-[#004272] text-white rounded hover:bg-[#005f72] transition duration-200">Add</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddNewUser
