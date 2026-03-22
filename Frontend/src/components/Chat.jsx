import React, { useState, useEffect, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { useSelector, useDispatch } from 'react-redux';
import { clearMessages, getMessageHistory, updateMessages } from '../slices/messageSlice';
import { timeAgo } from '../utils/timeAgo';
import { useSocket } from '../configs/socket';
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

const Chat = ({ receiver }) => {
  const socket = useSocket();
  const { messages } = useSelector(state => state.message)
  const [message, setMessage] = useState('');
  const [openEmoji, setOpenEmoji] = useState(false);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userInfo } = useSelector(state => state.auth)
  const { users } = useSelector(state => state.post)

  useEffect(() => {
    if (socket) {
      const connectionData = [userInfo?.devGlowAccess._id, receiver._id]
      socket.emit('join-person-room', (connectionData))
      dispatch(getMessageHistory(receiver._id))
      return () => {
        dispatch(clearMessages())
        socket.emit('leave-room')
      }
    }
  }, [receiver._id, dispatch, userInfo?.devGlowAccess._id, socket]);

  useEffect(() => {
    if (socket) {
      const handleReceive = (data) => {
        dispatch(updateMessages(data));
      }
      socket.on('receive', handleReceive);
      socket.on('typingStatus', (data) => {
        setTyping(data.status)
      });
      return () => {
        socket.off('receive', handleReceive);
        dispatch(clearMessages());
      };
    }
  }, [socket, dispatch])


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleEmojiSelect = (emoji) => {
    setMessage(prevContent => prevContent + emoji.emoji);
    setOpenEmoji(false);
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    if (!message.trim()) return;
    const data = {
      sender: userInfo?.devGlowAccess._id,
      receiver: receiver._id,
      content: message,
    };
    dispatch(updateMessages(data))
    if (socket) {
      socket.emit('send', data);
    } else {
      console.error('Socket is not connected');
    }
    setMessage('');
  };

  const handleInput = (e) => {
    setMessage(e.target.value)
    if (socket) {
      socket.emit('typing', (receiver._id));
    }
  }

  return (
    <div className='w-full h-full flex flex-col'>
      <div className='w-full flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-white'>
        <div className='flex items-center'>
          <div className='border border-slate-200 rounded-full overflow-hidden mr-3 shadow-sm'>
            <img className='w-[40px] h-[40px] object-cover' src={receiver?.profile_url ? receiver?.profile_url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSinUiRqVB94sfZZbtNZgPJswUTs4R7YDskvXfVjUSejKfQqAoMaedQBNfybdIdduiix4&usqp=CAU"} alt="profilepic" />
          </div>
          <div className='flex flex-col'>
            <h1 className='text-[15px] font-bold text-slate-800 hover:text-indigo-600 hover:underline hover:cursor-pointer leading-tight'>{receiver ? receiver.username : 'Unknown'}</h1>
            <div className='flex items-center gap-2 mt-1'>
                <p className='text-[11px] text-slate-500 font-medium'>{receiver?.badge ? receiver.badge : 'Beginner'}</p>
                {typing && (
                  <span className="text-[10px] font-semibold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full flex items-center">typing...</span>
                )}
            </div>
          </div>
        </div>
        <div>
          <button onClick={() => navigate(`/videoCall/${receiver._id}`)} className="p-2 rounded-full hover:bg-slate-50 text-slate-400 hover:text-indigo-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          </button>
        </div>
      </div>
      <div className='w-full p-4 flex-1 overflow-auto bg-slate-50 relative'>
        <ul className='space-y-4'>
          {messages.map((message, index) => {
            let userData = users.find(ele => ele._id === message.sender);
            const isSender = message.sender === userInfo?.devGlowAccess._id;
            return (
              <li key={index} className={`mb-2 ${isSender ? 'ml-auto max-w-[70%]' : 'max-w-[70%]'}`}>
                <div className={`p-3 w-fit ${isSender ? 'bg-indigo-600 text-white rounded-2xl rounded-tr-sm ml-auto' : 'bg-white border border-slate-200 text-slate-800 rounded-2xl rounded-tl-sm'} shadow-sm`}>
                  <div className='flex items-start gap-2'>
                    <div>
                      <p className='text-[14px] leading-relaxed'>{message.content}</p>
                      <p className={`text-[10px] mt-1 text-right ${isSender ? 'text-indigo-200' : 'text-slate-400'}`}>{timeAgo(message.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
          <div ref={messagesEndRef}></div>
        </ul>
      </div>
      <form className='p-4 bg-white border-t border-slate-100 w-full flex items-center gap-3 relative' onSubmit={sendMessage}>
        <div className='relative flex-1'>
            <input
            className='w-full p-3 pr-10 text-[14px] focus:outline-none bg-slate-100 rounded-full focus:ring-2 focus:ring-indigo-100 transition-all text-slate-800 px-5'
            type="text"
            value={message}
            onChange={handleInput}
            placeholder="Type a message..."
            />
            <button type="button" onClick={() => setOpenEmoji(!openEmoji)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                </svg>
            </button>
        </div>

        <button className='bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-semibold p-3 rounded-full flex-shrink-0 flex items-center justify-center focus:ring-4 focus:ring-indigo-100 shadow-sm' type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
        </button>
        
        {openEmoji && (
        <div className='absolute bottom-20 left-4 z-50 shadow-xl rounded-2xl overflow-hidden'>
            <EmojiPicker onEmojiClick={handleEmojiSelect} />
        </div>
        )}
      </form>
    </div>
  );
};

Chat.propTypes = {
  receiver: PropTypes.object.isRequired
};

export default Chat;
