import React, { useState, useEffect, useRef } from 'react'
import { useSocket } from '../configs/socket';
// import { useSelector } from 'react-redux';
import Peer from 'simple-peer'

const VideoCall = () => {
    const socket = useSocket();
    // const { userInfo } = useSelector(state => state.auth)
    const [room, setRoom] = useState(null)
    const [stream, setStream] = useState()
    const [receiverCall, setReceiverCall] = useState(false)
    const [caller, setCaller] = useState("")
    const [callerSignal, setCallerSignal] = useState()
    const [callAccepted, setCallAccepted] = useState(false)
    const [callEnded, setCallEnded] = useState(false)
    const [name, setName] = useState("")

    const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            setStream(stream)
            myVideo.current.srcObject = stream
        })
        socket.emit("get-room")
        socket.on("room", (data) => {
            setRoom(data)
        })

        socket.on("callUser", (data) => {
            setReceiverCall(true)
            setCaller(data.name)
            setName(data.name)
            setCallerSignal(data.signal)
        })
    }, [])

    const callUser = (id) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        })

        peer.on("signal", (data) => {
            socket.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: room,
                name: name
            })
        })

        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream
        })

        socket.on("callAccepted", (signal) => {
            setCallAccepted(true)
            peer.signal(signal)
        })

        connectionRef.current = peer
    }

    const answerCall = () => {
        setCallAccepted(true)
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        })

        peer.on("signal", (data) => {
            socket.emit("answerCall", { signal: data, to: caller })
        })

        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream
        })

        peer.signal(callerSignal)
        connectionRef.current = peer

    }

    const leaveCall = () => {
        setCallEnded(true)
        connectionRef.current.destroy()
    }

    return (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
            <div className='absolute w-screen h-full bg-black/60 flex justify-center items-center z-[100] top-0'>
                <div className='bg-white rounded-[10px] w-[90%] h-[90%] flex flex-col justify-center text-[#720058] text-sm items-center'>
                    <div className='w-full h-[80%] relative '>
                        <div className='absolute right-0 top-0'>
                            {
                                receiverCall && !callAccepted ? (
                                    <div>
                                        <h1>{name} is callingg</h1>
                                        <svg onClick={answerCall} xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                        </svg>
                                    </div>
                                ) : null
                            }
                        </div>
                        {stream && <video playsInline muted ref={myVideo} autoPlay className='w-[50%] h-[50%]' />}
                        {callAccepted && !callEnded ?
                            <video playsInline ref={userVideo} autoPlay className='w-[50%] h-[50%]' />
                            : null
                        }
                    </div>
                    <div className='h-auto w-[50%] '>
                        {callAccepted && !callEnded ?
                            <svg onClick={leaveCall} xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 3.75 18 6m0 0 2.25 2.25M18 6l2.25-2.25M18 6l-2.25 2.25m1.5 13.5c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z" />
                            </svg>
                            : <svg onClick={() => callUser(room)} xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                            </svg>

                        }


                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoCall
