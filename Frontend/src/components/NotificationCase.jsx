import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useSocket } from '../configs/socket'
import { timeAgo } from '../utils/timeAgo'

const NotificationCase = () => {
  const { userInfo } = useSelector(state => state.auth)
  const { users } = useSelector(state => state.post)
  const [notifications, setNotification] = useState([])
  const socket = useSocket()

  const debouncedFetchNotifications = useCallback(() => {
    socket.emit('get-notifications', userInfo?.devGlowAccess?._id);
  }, [socket, userInfo?.devGlowAccess?._id]);

  useEffect(() => {
    if (socket) {
      const timer = setInterval(debouncedFetchNotifications, 1000);
      socket.on('notifications', (data) => {
        setNotification(data)
      });
      return () => clearInterval(timer);
    }
  }, [debouncedFetchNotifications, socket])

  return (
    <div className='hidden lg:flex flex-col bg-white p-5 rounded-2xl w-[280px] max-h-[350px] text-sm shadow-soft border border-slate-100 relative'>
      <p className="font-bold text-slate-900 mb-2">Notifications</p>
      <hr className='border-slate-100 w-full mb-2'/>
      <div className="mt-4 custom-scrollbar overflow-y-scroll h-full">
        {notifications.length > 0 ? (
          notifications?.map((notification) => {
            const userData = users?.find(ele => ele._id === notification.sender)
            const message = notification.type === "like" ? "liked your post" : notification.type === "comment" ? "commented on your post" : notification.type === "follow" ? "has followed you" : ""
            return (
              <div key={notification._id} className="flex flex-col p-2 rounded-xl mb-2 hover:bg-slate-50 hover:cursor-pointer transition-colors">
                <div className='flex items-start'>
                  <p>{userData?.username + " " + message}</p>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 ml-2 text-slate-400 mt-1 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                  </svg>
                </div>
                <p className='text-[10px] text-[#979797]'>{timeAgo(notification.createdAt)}</p>
              </div>
            )
          })
        ) : (
          <p className="text-center text-gray-500">No notifications.</p>
        )}
      </div>
    </div>
  )
}

export default NotificationCase
