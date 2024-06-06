import React, { useState, useMemo, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import UserCard from './UserCard';
import { addUser } from '../slices/communitySlice';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types'

const AddUsers = ({ communityId, openAddUsers }) => {
    const [searchValue, setSearchValue] = useState('')
    const [community, setCommunity] = useState({})
    const { users } = useSelector(state => state.post)
    const { communities } = useSelector(state => state.community)
    const dispatch = useDispatch()
    
    useEffect(()=>{
      const communityData = communities.find(ele => ele._id === communityId)
      setCommunity(communityData)
    },[communities,communityId])
    
    const filteredUsers = useMemo(() => {
        if (searchValue !== '') {
            return users.filter(user => user?.username.toLowerCase()?.includes(searchValue.toLowerCase()));
        } else {
            return users;
        }
    }, [searchValue, users]);

    const handleAdd = (userId) => {
          const data = {
            communityId:community._id,
            newUserId: userId
          }
        dispatch(addUser(data)).then((action) => {
            if (action.meta.requestStatus === "rejected") {
                const errorMessage = "Something went wrong";
                toast.error(errorMessage);
            } else {
                toast.success("Done")
            }
        })
    }


    return (
        <div className='fixed inset-0 flex items-center justify-center z-1000'>
            <div className='absolute w-screen h-full bg-black/60 flex justify-center items-center z-[100] top-0'>
                <div className='bg-white rounded-[10px] w-[400px] h-auto p-3 flex flex-col justify-center items-center text-[#720058] text-sm'>
                    <h1 className='font-bold'>Add users to community</h1>
                    <input
                        className='border pl-1 text-sm w-[60%] h-7 focus:outline-[#720058] mt-2 mb-2'
                        type="text"
                        placeholder="Search users"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <div className='w-full h-[400px] border-2 mb-2 overflow-y-scroll'>
                        {filteredUsers?.length > 0 ?
                            <ul>
                                {filteredUsers?.map((user) => (
                                    <li key={user._id} className='flex'>
                                        <UserCard user={user} />
                                        {community.members?.includes(user._id) ? <button onClick={()=>handleAdd(user._id)} className='w-[40px] flex items-center justify-center bg-green-600 hover:bg-red-600 text-white text-xl'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>
                                        </button> : <button onClick={()=>handleAdd(user._id)} className='w-[40px] flex items-center justify-center bg-[#004272] text-white hover:bg-green-600 text-xl'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                        </button>}
                                    </li>
                                ))}
                            </ul>

                            : (
                                <div className='w-full flex justify-center h-full items-center'>
                                    <h1 className='font-semibold'>empty !</h1>
                                </div>
                            )}
                    </div>
                    <button onClick={() => openAddUsers(false)} className="bg-indigo-600 text-white px-4 py-2 rounded">Close</button>
                </div>
            </div>
        </div>
    )
}

AddUsers.propTypes = {
    communityId: PropTypes.string.isRequired,
    openAddUsers: PropTypes.func.isRequired,
  };

export default AddUsers
