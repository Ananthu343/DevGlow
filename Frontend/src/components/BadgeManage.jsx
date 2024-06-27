import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import CreateBadge from './Createbadge';
import EditBadge from './EditBadge';
import { deleteBadge } from '../slices/adminSlice';
import { removeFromBadges } from '../slices/leaderboardSlice';

const BadgeManage = () => {
    const dispatch = useDispatch()
    const { badges } = useSelector(state => state.leaderboard);
    const [modal, setModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [edit, setEdit] = useState({})

    const handleDelete = (id) => {
        dispatch(deleteBadge(id)).then((action) => {
            if (action.meta.requestStatus === "rejected") {
                const errorMessage = "Unable to delete";
                toast.error(errorMessage);
            } else {
                toast.success("Deleted")
                dispatch(removeFromBadges(action.payload))
            }
        })
    }

    const handleEdit = (badge) => {
        setEdit(badge)
        setEditModal(true)
    }


    return (
        <div className='flex flex-col w-full'>
            <div className='flex justify-between w-[100%] pl-3 pr-3 border-b pb-3'>
                <div className='w-[30%] flex justify-between'>
                    <h1 className='font-semibold text-[#720058]'>Badge manage</h1>
                </div>
                <button onClick={() => setModal(true)} className='text-white bg-[#004272] rounded pl-2 pr-2'>Add new badge</button>
            </div>
            <div className='w-full h-[550px] custom-scrollbar overflow-y-scroll flex items-center justify-center'>
                {
                    badges?.length > 0 ?
                        <table className="min-w-max w-full h-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sl.no</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Badge name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Icon</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min stars</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white/40 divide-y divide-gray-200">
                                {badges.map((badge, index) => {
                                    return badge?.badge_name && (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{badge.badge_name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className='border border-[#720058] rounded-full overflow-hidden mr-2 relative w-20 h-20'>
                                                    <img className='w-full h-full object-cover' src={badge?.badge_url ? badge?.badge_url : "https://img.freepik.com/free-vector/shield_24908-54457.jpg?size=626&ext=jpg&ga=GA1.1.1141335507.1717804800&semt=ais_user"} alt="profilepic" />
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap">{badge.min_stars}</td>
                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                <svg onClick={() => handleEdit(badge)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                </svg>
                                            </td>
                                            <td>
                                                <svg onClick={() => handleDelete(badge._id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:text-red-500 cursor-pointer">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                                </svg>
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
                modal && <CreateBadge setModal={setModal} />
            }
            {
                editModal && <EditBadge setModal={setEditModal} badge={edit} />
            }
        </div>
    )
}

export default BadgeManage
