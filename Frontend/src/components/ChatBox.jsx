import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import Chat from './Chat';
import { useSocket } from '../configs/socket';

const ChatBox = () => {
    const socket = useSocket();
    const [followers, setFollowers] = useState([]);
    const [unreadData, setUnreadData] = useState([])
    const [chatBox, openChatBox] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState(null);
    const { users } = useSelector(state => state.post);
    const { userInfo } = useSelector(state => state.auth);

    const debouncedFetchUnreadMessages = useCallback(() => {
        socket.emit('get-unread-messages', userInfo?.devGlowAccess?._id);
    }, [socket, userInfo?.devGlowAccess?._id]);

    useEffect(() => {
        if (socket) {
            const timer = setInterval(debouncedFetchUnreadMessages, 500);

            socket.on('unreadMessages', (data) => {
                const senderCounts = new Map();
                data.forEach((ele) => {
                    if (senderCounts.has(ele.sender)) {
                        senderCounts.set(ele.sender, senderCounts.get(ele.sender) + 1);
                    } else {
                        senderCounts.set(ele.sender, 1);
                    }
                });
                const organizedData = Array.from(senderCounts.entries()).map(([sender, count]) => ({
                    sender,
                    count
                }));
                setUnreadData(organizedData)
            });
            return () => clearInterval(timer);
        }

    }, [debouncedFetchUnreadMessages, socket])

    useEffect(() => {
        const myData = users?.find(ele => ele._id === userInfo?.devGlowAccess._id)
        const data = users?.filter(ele => myData?.followers.includes(ele._id));
        setFollowers(data);
    }, [users, userInfo?.devGlowAccess]);

    const openChat = (user) => {
        setSelectedUserId(user._id)
        const data = {
            sender: user._id,
            receiver: userInfo?.devGlowAccess._id
        }
        socket.emit("mark-read", (data))
        openChatBox(<Chat receiver={user} />)
    }

    return (
        <div className='lg:flex justify-between w-full h-full'>
            <div className='hidden h-[600px] border-r border-slate-100 lg:flex w-[30%] bg-white p-4 flex-col text-sm font-semibold text-slate-800 custom-scrollbar overflow-y-scroll'>
                <p className='text-slate-900 font-bold mb-2'>Messages</p>
                <hr className='border-slate-100 w-full mb-3'/>
                {followers?.length > 0 ?
                    <ul>
                        {followers.map((user) => {
                            const unreadCount = unreadData.find(ele => ele.sender === user._id)
                            return (
                                <li key={user._id} className={`cursor-pointer flex w-full items-center mb-2 px-2 py-1 rounded-xl transition-all ${selectedUserId === user._id ? 'bg-slate-100 shadow-sm' : 'hover:bg-slate-50'}`}>
                                    <div onClick={() => openChat(user)} className='flex p-2 w-full items-center justify-between'>
                                        <div className='flex items-center'>
                                            {user?.profile_url ? (
                                                <div className='border border-slate-200 rounded-full overflow-hidden mr-3 shadow-sm'>
                                                    <img className='w-[40px] h-[40px] object-cover' src={user?.profile_url} alt="profilepic" />
                                                </div>
                                            ) : (
                                                <img className='border border-slate-200 shadow-sm w-[40px] h-[40px] rounded-full mr-3 hidden lg:flex'
                                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSinUiRqVB94sfZZbtNZgPJswUTs4R7YDskvXfVjUSejKfQqAoMaedQBNfybdIdduiix4&usqp=CAU"
                                                    alt="profile pic" />
                                            )}

                                            <h2 className="text-sm font-semibold text-slate-800">{user.username}</h2>
                                        </div>
                                        {unreadCount?.count > 0 && <div className='w-5 h-5 bg-indigo-600 flex justify-center items-center rounded-full text-white text-[10px]'>
                                            <p>{unreadCount?.count}</p>
                                        </div>}
                                    </div>
                                </li>
                            )
                        })}
                    </ul>

                    : (
                        <div className='w-full flex justify-center h-full items-center'>
                            <h1 className='font-medium text-slate-500'>No messages found</h1>
                        </div>
                    )}
            </div>
            <div className='lg:hidden w-full px-2 pt-3 pb-2 bg-white overflow-x-auto flex flex-col border-b border-slate-100 text-sm font-semibold text-slate-900'>
                <p className="ml-2">Messages</p>
                {followers?.length > 0 ?
                    <ul className="flex overflow-x-scroll w-full p-2 gap-2 custom-scrollbar">
                        {followers.map((user) => (
                            <li key={user._id} className={`cursor-pointer shrink-0 flex items-center p-2 rounded-xl transition-all ${selectedUserId === user._id ? 'bg-slate-100 shadow-sm' : 'hover:bg-slate-50'}`}>
                                <div onClick={() => openChat(user)} className='flex items-center '>
                                    {user.profile_url ? (
                                        <div className='border border-slate-200 shadow-sm rounded-full overflow-hidden mr-2'>
                                            <img className='w-[36px] h-[36px] object-cover' src={user?.profile_url} alt="profilepic" />
                                        </div>
                                    ) : (
                                        <img className='border border-slate-200 shadow-sm w-[36px] h-[36px] rounded-full mr-2'
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSinUiRqVB94sfZZbtNZgPJswUTs4R7YDskvXfQqAoMaedQBNfybdIdduiix4&usqp=CAU"
                                            alt="profile pic" />
                                    )}

                                    <h2 className="text-xs font-semibold whitespace-nowrap">{user.username}</h2>
                                </div>
                            </li>
                        ))}
                    </ul>
                    : (
                        <div className='w-full flex justify-center h-full items-center py-4'>
                            <h1 className='font-semibold text-slate-500'>empty!</h1>
                        </div>
                    )}
            </div>

            <div className='w-full bg-white h-[600px] flex justify-center items-center'>
                {chatBox ? chatBox : <div className='h-full w-full flex flex-col items-center justify-center opacity-60'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-[100px] text-slate-300 mb-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                    </svg>

                    <p className='text-[20px] font-medium text-[#979797]'>Select a user to message</p>
                </div>}
            </div>
        </div>
    )
}

export default ChatBox
