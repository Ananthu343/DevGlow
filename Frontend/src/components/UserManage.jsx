import React, { useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import UserCard from './UserCard'
import toast from 'react-hot-toast'
import { addNewAdmin, restrictUser } from '../slices/adminSlice'
import { updateBlockStatus, updateAdminStatus } from '../slices/postSlice'
import AddNewUser from './AddNewUser'

const UserManage = () => {
    const dispatch = useDispatch()
    const { users } = useSelector(state => state.post);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState("All");
    const [modal, setModal] = useState(false)

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleBlock = (id) => {
        dispatch(restrictUser(id)).then((action) => {
            if (action.meta.requestStatus === "rejected") {
                const errorMessage = "Something went wrong";
                toast.error(errorMessage);
            } else {
                console.log(action.payload, "status");
                dispatch(updateBlockStatus(action.payload));
            }
        })
    }

    const handleAdmin = (id) => {
        dispatch(addNewAdmin(id)).then((action) => {
            if (action.meta.requestStatus === "rejected") {
                const errorMessage = "Something went wrong";
                toast.error(errorMessage);
            } else {
                dispatch(updateAdminStatus(action.payload));
            }
        })
    }

    const filteredData = useMemo(() => {
        let data = users;

        switch (filter) {
            case "Blocked":
                data = users.filter(user => user.status === true);
                break;
            case "Report":
                data = users.filter(user => user.reportCount > 10);
                break;
            default:
                break;
        }

        if (searchQuery.trim() !== '') {
            data = data.filter(user => user.username.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        return data;
    }, [users, filter, searchQuery]);

    return (
        <div className='flex flex-col w-full'>
            <div className='flex justify-between w-[100%] pl-3 pr-3 border-b pb-3'>
                <div className='w-[30%] flex justify-between'>
                    <h1 className='font-semibold text-[#720058]'>User manage</h1>
                    <div className='flex'>
                        <p>filter:</p>
                        <select onChange={handleFilterChange} value={filter} className='text-white bg-[#004272] rounded'>
                            <option value="All">All</option>
                            <option value="Blocked">Blocked</option>
                            <option value="Report">To report</option>
                        </select>
                    </div>
                </div>
                <input
                    type="text"
                    placeholder="Search users by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-2 border-gray-300 pl-2 rounded-md focus:outline-none focus:border-blue-500"
                />
                <button onClick={() => setModal(true)} className='text-white bg-[#004272] rounded pl-2 pr-2'>Add new user</button>
            </div>
            <div className='w-full h-[550px] custom-scrollbar overflow-y-scroll flex items-center justify-center'>
                {
                    filteredData.length > 0 ?
                        <table className="min-w-max w-full h-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sl.no</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report count</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Block/Unblock</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white/40 divide-y divide-gray-200">
                                {filteredData.map((user, index) => {
                                    return user?.username && (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                            <td className="whitespace-nowrap">
                                                <UserCard user={user} />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.reportCount}</td>
                                            <td>
                                                {user.status ? (
                                                    <svg
                                                        onClick={() => handleBlock(user._id)}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="size-6 cursor-pointer text-red-500 hover:text-green-500"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        onClick={() => handleBlock(user._id)}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="size-6 cursor-pointer hover:text-red-500"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                                    </svg>
                                                )}
                                            </td>
                                            <td>
                                                {user.roles.includes("admin") ? (
                                                    <svg onClick={() => handleAdmin(user._id)} xmlns="http://www.w3.org/2000/svg" fill="lightgreen" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                                                    </svg>

                                                ) : (
                                                    <svg onClick={() => handleAdmin(user._id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
                                                    </svg>

                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>

                        </table> :
                        <h1 >Empty data</h1>
                }
            </div>
            {
                modal && <AddNewUser setModal={setModal} />
            }
        </div>
    )
}

export default UserManage
