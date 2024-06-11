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
    <div className='hidden lg:flex flex-col bg-white p-3 rounded w-[280px] h-[250px] text-sm  shadow-lg sticky top-[60px]'>
      <p className="font-bold mb-2 text-[#720058]">Notification</p>
      <div className='h-[0.5px] border border-b w-full'></div>
      <div className="mt-4 overflow-y-scroll h-full">
        {notifications.length > 0 ? (
          notifications?.map((notification) => {
            const userData = users?.find(ele => ele._id === notification.sender)
            const message = notification.type === "like" ? "liked your post" : notification.type === "comment" ? "commented on your post" : notification.type === "follow" ? "has followed you" : ""
            return (
              <div key={notification._id} className="flex flex-col p-1 justify-between mb-4 last:mb-0 hover:bg-gray-100 hover:cursor-pointer border-b ">
                <div className='flex'>
                  <p>{userData?.username + " " + message}</p>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#004272" className="size-5 ml-2">
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
