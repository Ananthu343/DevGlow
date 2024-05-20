import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from '../slices/postSlice';
import Chat from './Chat';

const ChatBox = () => {
    const [followers, setFollowers] = useState([]);
    const [chatBox, openChatBox] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState(null);
    const { users } = useSelector(state => state.post);
    const { userInfo } = useSelector(state => state.auth);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    useEffect(() => {
        const myData = users?.find(ele => ele._id ===  userInfo.devGlowAccess._id)
        const data = users?.filter(ele => myData.followers.includes(ele._id));
        setFollowers(data);
    }, [users, userInfo.devGlowAccess]);

    const openChat = (user) => {
        setSelectedUserId(user._id)
        openChatBox(<Chat receiver={user} />)
    }
    console.log(followers);
    return (
        <div className='lg:flex justify-between w-full'>
            <div className='hidden h-[600px] border-r lg:flex w-[30%] bg-white p-3 flex-col rounded-l text-sm font-semibold text-[#720058] overflow-y-scroll'>
                <p>Messages</p>
                <div className='h-[0.5px] border border-b w-full mb-2'></div>
                {followers?.length > 0 ?
                    <ul>
                        {followers.map((user) => (
                            <li key={user._id} className={`cursor-pointer flex flex-col w-full hover:bg-gray-100 items-center mb-2 ${selectedUserId === user._id ? 'border-b shadow-lg' : ''}`}>
                                <div onClick={() => openChat(user)} className='cursor-pointer flex p-2 w-full border-b items-center '>
                                    {user.profile_url ? (
                                        <div className='border border-[#720058] rounded-full overflow-hidden mr-2'>
                                            <img className='w-[40px] h-[40px] object-cover' src={user?.profile_url} alt="profilepic" />
                                        </div>
                                    ) : (
                                        <img className='border border-[#720058] w-7 rounded-full mr-2 hidden lg:flex'
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSinUiRqVB94sfZZbtNZgPJswUTs4R7YDskvXfQqAoMaedQBNfybdIdduiix4&usqp=CAU"
                                            alt="profile pic" />
                                    )}

                                    <h2 className="text-sm font-semibold">{user.username}</h2>
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
                <p>Messages</p>
                {followers?.length > 0 ?
                    <ul className="flex overflow-x-scroll w-full p-2">
                        {followers.map((user) => (
                            <li key={user._id} className={`cursor-pointer flex w-[100px] hover:bg-gray-100 items-center mb-2 border-r ${selectedUserId === user._id ? 'border-b shadow-lg' : ''}`} style={{ height: '40px' }}> {/* Adjusted height */}
                                <div onClick={() => openChat(user)} className='cursor-pointer flex flex-col w-full border-b items-center '>
                                    {user.profile_url ? (
                                        <div className='border border-[#720058] rounded-full overflow-hidden mr-2'>
                                            <img className='w-[30px] h-[30px] object-cover' src={user?.profile_url} alt="profilepic" />
                                        </div>
                                    ) : (
                                        <img className='border border-[#720058] w-7 rounded-full mr-2 hidden lg:flex'
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSinUiRqVB94sfZZbtNZgPJswUTs4R7YDskvXfQqAoMaedQBNfybdIdduiix4&usqp=CAU"
                                            alt="profile pic" />
                                    )}

                                    <h2 className="text-xs font-semibold">{user.username}</h2>
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
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[100px]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                    </svg>

                    <p className='text-[20px] text-[#979797]'>Be in touch now !!!</p>
                </div>}
            </div>
        </div>
    )
}

export default ChatBox
