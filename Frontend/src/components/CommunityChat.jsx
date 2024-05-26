import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getCommunityHistory, clearCommunityMessages, updateCommunityMessages } from '../slices/communitySlice';
import { timeAgo } from '../utils/timeAgo';
import io from 'socket.io-client';
import EmojiPicker from 'emoji-picker-react';
import DropdownMenu from './DropdownMenu';
import CommunityOverview from './CommunityOverview';
import AddUsers from './AddUsers';

const CommunityChat = ({ communityId }) => {
    const { userInfo } = useSelector(state => state.auth)
    const { communityMessages,communities } = useSelector(state => state.community)
    const { users } = useSelector(state => state.post)
    const messagesEndRef = useRef(null);
    const [message, setMessage] = useState('');
    const [community, setCommunity] = useState({})
    const [openEmoji, setOpenEmoji] = useState(false);
    const [modal, setModal] = useState(false);
    const [addUsers, openAddUsers] = useState(false);
    const [socket, setSocket] = useState(null);
    const dispatch = useDispatch()

    useEffect(()=>{
        const communityData = communities.find(ele => ele._id === communityId)
        setCommunity(communityData)
      },[communities,communityId])

    useEffect(() => {
        const socket = io("http://localhost:3001");
        socket.on('connect', () => {
            console.log('Connected to server');
        });
        const communityId = community._id
        socket.emit('join-community-room', (communityId))
        dispatch(getCommunityHistory(communityId))
        setSocket(socket)
        return () => {
            dispatch(clearCommunityMessages())
            socket.disconnect();
            console.log("disconnected");
        };
    }, [dispatch, community]);

    useEffect(() => {
        if (socket) {
            socket.on('receive-community-message', (data) => {
                dispatch(updateCommunityMessages(data))
            })
        }
    }, [socket, dispatch])


    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [communityMessages]);

    const handleEmojiSelect = (emoji) => {
        setMessage(prevContent => prevContent + emoji.emoji);
        setOpenEmoji(false);
    };


    const sendMessage = async (event) => {
        event.preventDefault();
        if (!message.trim()) return;
        const data = {
            sender: userInfo?.devGlowAccess._id,
            content: message,
            communityId: community._id
        };
        dispatch(updateCommunityMessages(data))
        if (socket) {
            socket.emit('send-community-message', data);
        } else {
            console.error('Socket is not connected');
        }
        setMessage('');
    };

    return (
        <div className='w-full h-full flex flex-col p-3'>
            <div className='w-full flex pl-3 pr-3 mb-2 justify-between'>
                <div className='flex'>
                    <div className='border border-[#720058] rounded-full overflow-hidden mr-2'>
                        <img className='w-[30px] h-[30px] object-cover' src={community?.profile_url ? community?.profile_url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL0sjQoYo1rZf1oYqSaRE9Q8Itv7fbij4aXRgoeAQFhw&s"} alt="profilepic" />
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='text-sm font-semibold hover:text-blue-800 hover:underline hover:cursor-pointer'>{community ? community.name : 'Unknown'}</h1>
                        <div className='flex'>
                            <p className='text-[9px] text-[#979797]'>{community?.description ? community.description : 'Beginner'}</p>
                            <p className='text-[9px] text-black ml-2'>Members : {community?.members ? community.members.length : '0'} / {community?.user_limit ?? "1"}</p>
                        </div>
                    </div>
                </div>
                {userInfo?.devGlowAccess._id === community.creatorId ? <DropdownMenu setAbout={setModal} openAddUsers={openAddUsers} options={["About","Add users"]}/> : <DropdownMenu setAbout={setModal} options={["About"]}/>}
            </div>
            <div className=' w-full p-3 h-[90%] overflow-auto border-2 bg-customCommunity-bg'>
                <ul className='space-y-4'>
                    {communityMessages.map((message, index) => {
                        let userData = users.find(ele => ele._id === message.sender);
                        const isSender = message.sender === userInfo.devGlowAccess._id;
                        return (
                            <li key={index} className={`mb-1 ${isSender ? 'ml-auto w-[50%]' : 'w-[50%]'}`}>
                                <div className={`rounded-lg p-3 ${isSender ? 'flex bg-white justify-end' : 'bg-gray-100'} shadow-md`}>
                                    <div className='flex items-start space-x-2'>
                                        {!isSender && (
                                            <img className='w-8 h-8 rounded-full' src={userData?.profile_url || "https://via.placeholder.com/150"} alt="Profile Pic" />
                                        )}
                                        <div>
                                            <p>{message.content}</p>
                                            <p className='text-[9px] text-gray-600'>{timeAgo(message?.createdAt)}</p>
                                        </div>
                                        {isSender && (
                                            <img className='w-8 h-8 rounded-full ml-auto' src={userData?.profile_url || "https://via.placeholder.com/150"} alt="Profile Pic" />
                                        )}
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                    <div ref={messagesEndRef}></div>
                </ul>
            </div>
            <form className='mt-2 w-full flex items-center' onSubmit={sendMessage}>
                <input
                    className='w-[70%] lg:w-[40%] p-2 text-sm focus:outline-[#004272] border-2'
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <svg onClick={() => setOpenEmoji(!openEmoji)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer ml-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                </svg>

                <button className='ml-5 bg-[#004272] text-white font-semibld p-1 rounded' type="submit">Send</button>
                <div className='absolute mt-7'>
                    {openEmoji && (
                        <div className='absolute mt-3'>
                            <EmojiPicker onEmojiClick={handleEmojiSelect} />
                        </div>
                    )}
                </div>
            </form>
            {modal && <CommunityOverview setModal={setModal} community={community}/>}
            {addUsers && <AddUsers openAddUsers={openAddUsers} communityId={community._id}/>}
        </div>
    );
}

export default CommunityChat
