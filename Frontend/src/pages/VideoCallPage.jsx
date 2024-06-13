import React, { useEffect, useState } from 'react'
import VideoCall from '../components/VideoCall'
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getRoomId } from '../slices/messageSlice'
import toast from 'react-hot-toast'

const VideoCallPage = () => {
  const [roomId, setRoomId] = useState('')
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRoomId(id)).then((action) => {
      if (action.meta.requestStatus === "rejected") {
        const errorMessage = "Something went wrong";
        toast.error(errorMessage);
      } else {
        setRoomId(action.payload)
      }
    })
  }, [dispatch, id])

  return (
    <>
      <div className='w-full top-0 flex justify-center pt-[55px] mb-2'>
        <div className='h-screen w-[90%] md:w-[85%] lg:rounded-2xl shadow-lg flex justify-center bg-gray-200'>
          {roomId && <VideoCall roomId={roomId} />}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default VideoCallPage
