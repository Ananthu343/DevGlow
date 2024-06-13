import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { addNewUser } from '../slices/adminSlice';
import { pushIntoUsers } from '../slices/postSlice';

const AddNewUser = ({ setModal }) => {
    const { users } = useSelector(state => state.post);
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const validateEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
    const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
    const validateUsername = (username) => /^[a-zA-Z]{3,}$/.test(username);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (users.some(user => user.email === email)) {
            toast.error("Email already exists");
            return;
        }

        if (!validateEmail(email)) {
            toast.error("Email is not valid");
            return;
        }

        if (!validatePassword(password)) {
            toast.error("Use a strong password");
            return;
        }

        if (!validateUsername(username)) {
            toast.error("Username should contain only letters (minimum 3)");
            return;
        }

        try {
            await dispatch(addNewUser({ username, email, password })).unwrap();
            toast.success("User added successfully");
            dispatch(pushIntoUsers({ username, email }));
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
            <div className='absolute w-screen h-full bg-black/60 flex justify-center items-center z-[100] top-0'>
                <div className='bg-white rounded-[10px] w-[400px] h-auto p-3 flex flex-col justify-center text-[#720058] text-sm'>
                    <form onSubmit={handleSubmit}>
                        <div className='flex justify-between items-center mb-3'>
                            <h4 className='text-sm font-semibold'>Create User</h4>
                            <button aria-label="Close modal" onClick={() => setModal(false)}><img className='w-7' src="close.jpg" alt="close" /></button>
                        </div>
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text" placeholder="Sam" className="border border-gray-300 w-full p-2 mb-4 rounded" />

                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" placeholder="samvipro@gmail.com" className="border border-gray-300 w-full p-2 mb-4 rounded" />

                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" placeholder="Password" className="border border-gray-300 w-full p-2 mb-4 rounded" />

                        <button type="submit" className="w-full py-2 bg-[#004272] text-white rounded hover:bg-[#005f72] transition duration-200">Add</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddNewUser;
