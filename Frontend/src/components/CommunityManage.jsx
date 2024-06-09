import React, { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UserCard from './UserCard';
import CreateCommunity from './CreateCommunity';
import { restrictCommunity } from '../slices/adminSlice';
import { updateCommunityBlock , deleteCommunity } from '../slices/communitySlice';
import toast from 'react-hot-toast';


const CommunityManage = () => {
    const dispatch = useDispatch()
    const { users } = useSelector(state => state.post);
    const { communities } = useSelector(state => state.community);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState("All");
    const [modal, setModal] = useState(false)

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleBlock = (id) => {
        dispatch(restrictCommunity(id)).then((action) => {
            if (action.meta.requestStatus === "rejected") {
                const errorMessage = "Something went wrong";
                toast.error(errorMessage);
            } else {
                console.log(action.payload, "status");
                dispatch(updateCommunityBlock(action.payload));
            }
        })
    }

    const handleDelete = (id) => {
        dispatch(deleteCommunity(id)).then((action) => {
            if (action.meta.requestStatus === "rejected") {
                const errorMessage = "Unable to delete";
                toast.error(errorMessage);
            } else {
                toast.success("Deleted")
                setModal(false)
            }
        })
    }


    const filteredData = useMemo(() => {
        let data = communities;

        switch (filter) {
            case "Blocked":
                data = communities.filter(community => community.status === true);
                break;
            case "Report":
                data = communities.filter(community => community.reportCount > 50);
                break;
            default:
                break;
        }

        if (searchQuery.trim() !== '') {
            data = data.filter(community => community.username.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        return data;
    }, [communities, filter, searchQuery]);

    return (
        <div className='flex flex-col w-full'>
            <div className='flex justify-between w-[100%] pl-3 pr-3 border-b pb-3'>
                <div className='w-[30%] flex justify-between'>
                    <h1 className='font-semibold text-[#720058]'>Community manage</h1>
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
                <button onClick={() => setModal(true)} className='text-white bg-[#004272] rounded pl-2 pr-2'>Add new community</button>
            </div>
            <div className='w-full h-[550px] overflow-y-scroll flex items-center justify-center'>
                {
                    filteredData.length > 0 ?
                        <table className="min-w-max w-full h-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sl.no</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Creator</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User limit</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report count</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Block/Unblock</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white/40 divide-y divide-gray-200">
                                {filteredData.map((community, index) => {
                                    const user = users.find(ele => ele._id === community.creatorId)
                                    return community?.name && (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{community.name}</td>
                                            <td className="whitespace-nowrap">
                                                <UserCard user={user} />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{community.user_limit}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{community.reports}</td>
                                            <td>
                                                {community.status ? (
                                                    <svg
                                                        onClick={() => handleBlock(community._id)}
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
                                                        onClick={() => handleBlock(community._id)}
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
                                                <svg onClick={() => handleDelete(community._id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:text-red-500 cursor-pointer">
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
                modal && <CreateCommunity setModal={setModal} />
            }
        </div>
    )
}

export default CommunityManage
