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
      <div className="w-full max-w-7xl mx-auto pt-[85px] px-4 flex justify-center mb-8 h-[calc(100vh-85px)]">
        <div className="w-full h-full bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden flex justify-center relative">
          {roomId && <VideoCall roomId={roomId} />}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default VideoCallPage
