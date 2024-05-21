import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import CommunityChat from './CommunityChat'

const CommunityBox = () => {
    const [chatBox, openChatBox] = useState(false)
    const { communities } = useSelector(state => state.community)
    const { userInfo } = useSelector(state => state.auth)
    const [selectedCommunityId, setSelectedCommunityId] = useState(null);

    const openChat = (community) => {
        setSelectedCommunityId(community._id)
        openChatBox(<CommunityChat community={community} />)
    }

    return (
        <div className='lg:flex justify-between w-full'>
            <div className='hidden h-[600px] border-r lg:flex w-[30%] bg-white p-3 flex-col rounded-l text-sm font-semibold text-[#720058] overflow-y-scroll'>
                <p>My communities</p>
                <div className='h-[0.5px] border border-b w-full mb-2'></div>
                {communities?.length > 0 ?
                    <ul>
                        {communities.map((community) => (
                            community.members.includes(userInfo.devGlowAccess._id) &&
                                <li key={community._id} className={`cursor-pointer flex flex-col w-full hover:bg-gray-100 items-center mb-2 ${selectedCommunityId === community._id ? 'border-b shadow-lg' : ''}`}>
                                <div onClick={() => openChat(community)} className='cursor-pointer flex p-2 w-full border-b items-center '>
                                    {community.profile_url ? (
                                        <div className='border border-[#720058] rounded-full overflow-hidden mr-2'>
                                            <img className='w-[40px] h-[40px] object-cover' src={community?.profile_url} alt="profilepic" />
                                        </div>
                                    ) : (
                                        <img className='border border-[#720058] w-[40px] h-[40px] rounded-full mr-2 hidden lg:flex'
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL0sjQoYo1rZf1oYqSaRE9Q8Itv7fbij4aXRgoeAQFhw&s"
                                            alt="profile pic" />
                                    )}

                                    <h2 className="text-sm font-semibold">{community.name ?? "Unknown"}</h2>
                                </div>
                            </li> 
                        ))}
                    </ul>

                    : (
                        <div className='w-full flex justify-center h-full items-center'>
                            <h1 className='font-semibold'>empty !</h1>
                        </div>
                    )}
                <div className='h-[0.5px] border border-b w-full mt-5'></div>
            </div>
            <div className='lg:hidden  w-full p-3 bg-white overflow-x-auto flex flex-col border-b-3 text-sm font-semibold text-[#720058]'>
                <p>My communities</p>
                {communities?.length > 0 ?
                    <ul className="flex overflow-x-scroll w-full p-2">
                        {communities.map((community) => (
                            <li key={community._id} className={`cursor-pointer flex w-[100px] hover:bg-gray-100 items-center mb-2 border-r ${selectedCommunityId === community._id ? 'border-b shadow-lg' : ''}`} style={{ height: '40px' }}> {/* Adjusted height */}
                                <div onClick={() => openChat(community)} className='cursor-pointer flex flex-col w-full border-b items-center '>
                                    {community.profile_url ? (
                                        <div className='border border-[#720058] rounded-full overflow-hidden mr-2'>
                                            <img className='w-[30px] h-[30px] object-cover' src={community?.profile_url} alt="profilepic" />
                                        </div>
                                    ) : (
                                        <img className='border border-[#720058]  w-[40px] h-[40px] rounded-full mr-2 hidden lg:flex'
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL0sjQoYo1rZf1oYqSaRE9Q8Itv7fbij4aXRgoeAQFhw&s"
                                            alt="profile pic" />
                                    )}

                                    <h2 className="text-xs font-semibold">{community.name ?? "Unknown"}</h2>
                                </div>
                            </li>
                        ))}
                    </ul>
                    : (
                        <div className='w-full flex justify-center h-full items-center'>
                            <h1 className='font-semibold'>empty!</h1>
                        </div>
                    )}
            </div>

            <div className='w-full bg-white h-[400px] lg:h-[600px] flex justify-center items-center p-2'>
                {chatBox ? chatBox : <div className='h-full w-full flex flex-col items-center border-4 justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-[100px]">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    </svg>
                    <p className='text-[20px] text-[#979797]'>Make the connection !!!</p>
                </div>}
            </div>
        </div>
    )
}

export default CommunityBox
