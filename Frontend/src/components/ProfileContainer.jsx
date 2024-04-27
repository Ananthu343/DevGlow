import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getUser } from '../slices/userSlice'
import { getFeed } from '../slices/postSlice'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import ProgressBar from './Progressbar'
import NotificationCase from './NotificationCase'
import UserPosts from './UserPosts'

const ProfileContainer = ({ userId }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [myPosts, setMyPosts] = useState(true)
    const [savedPosts, setSavedPosts] = useState(false)
    const [followers, setFollowers] = useState(false)
    const [following, setFollowing] = useState(false)

    useEffect(() => {
        dispatch(getUser(userId)).then((action) => {
            if (action.meta.requestStatus === "rejected") {
                const errorMessage = "Something went wrong!";
                toast.error(errorMessage);
                navigate('/')
            } else {
                setUser(action.payload)
            }
        })
        dispatch(getFeed())
    }, [userId, dispatch])
    
    const openPosts = ()=>{
        setMyPosts(true)
        setSavedPosts(false)
        setFollowers(false)
        setFollowing(false)
    }
    const openSavedPost = ()=>{
        setMyPosts(false)
        setSavedPosts(true)
        setFollowers(false)
        setFollowing(false)
    }
    const openFollowers = ()=>{
        setMyPosts(false)
        setSavedPosts(false)
        setFollowers(true)
        setFollowing(false)
    }
    const openFollowing = ()=>{
        setMyPosts(false)
        setSavedPosts(false)
        setFollowers(false)
        setFollowing(true)
    }
    return (
        <>
            <div className='flex'>
                <img className='md:rounded-t-2xl w-full md:h-[200px]' src={user.banner_url ? user.banner_url : "https://pulsegp.com/wp-content/themes/leahy/assets/images/default-banner.png"} alt="user_banner" />
                <div className='w-full md:w-[85%] h-auto absolute flex justify-end pt-3 pr-3'>
                    <img className='w-5 rounded-full' src="editPen.png" alt="" />
                </div>
            </div>
            <div className='w-full p-3 h-auto flex justify-around'>
                <img className='border-2 border-[#720058] w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-full mt-[-50px] ml-[40%] md:ml-[5%]' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSinUiRqVB94sfZZbtNZgPJswUTs4R7YDskvXfVjUSejKfQqAoMaedQBNfybdIdduiix4&usqp=CAU" alt="profile pic" />
                <div className='flex'>
                    <div className='flex-col justify-between w-[40%]'>
                        <h2 className='text-xl font-semibold'>{user?.username ?? "Unknown"}</h2>
                        <p className='text-xs text-[#979797] mb-2'>{user?.gender ?? "He/She"}</p>
                        <p className='text-xs text-[#979797]'>{user?.badge ?? "Badge not earned!"}</p>
                        <div className='flex items-center mt-2'>
                            <p className='text-sm font-medium'>{user?.stars ?? "0"}</p>
                            <img className='w-5' src="star.webp" alt="star-img" />
                        </div>
                    </div>
                    <div className='flex justify-between pt-5 pl-5 w-[180px] ml-[100px] lg:ml-[0px]'>
                        <p className='text-xs font-bold text-[#004272]'>{user?.followers ?? "0"} Followers</p>
                        <p className='text-xs font-bold text-[#004272]'>{user?.following ?? "0"} Following</p>
                    </div>
                </div>
                <div className=' overflow-wrap-break-word flex flex-col items-center mt-5'>
                    <ProgressBar bgcolor="gold" progress={50} height={5} />
                    <p className='font-semibold text-sm'>{user?.about ?? "Set profile now!"}</p>
                </div>
                <div className='flex-col'>
                    <p className='text-xs text-[#979797] mb-1'>Settings</p>
                    <p className='text-xs font-bold #004272]'>Edit profile</p>
                </div>
            </div>
            <div className='h-auto w-full p-4'>
                <div className='w-full flex mt-2 mb-2  '>
                    <button onClick={openPosts} className={myPosts ? `shadow-lg border mr-2 pl-3 pr-3 pt-2 pb-2 text-[12px] font-semibold text-[#004272] bg-white` : ` border mr-2 pl-3 pr-3 pt-2 pb-2 text-[12px] font-semibold text-[#720058] bg-white`}>My posts</button>
                    <button onClick={openSavedPost} className={savedPosts ? `shadow-lg border mr-2 pl-3 pr-3 pt-2 pb-2 text-[12px] font-semibold text-[#004272] bg-white bg-white` : ` border mr-2 pl-3 pr-3 pt-2 pb-2 text-[12px] font-semibold text-[#720058] bg-white`}>Saved posts</button>
                    <button onClick={openFollowers} className={followers ? `shadow-lg border mr-2 pl-3 pr-3 pt-2 pb-2 text-[12px] font-semibold text-[#004272] bg-white bg-white` : ` border mr-2 pl-3 pr-3 pt-2 pb-2 text-[12px] font-semibold text-[#720058] bg-white`}>Followers</button>
                    <button onClick={openFollowing} className={following ? `shadow-lg border mr-2 pl-3 pr-3 pt-2 pb-2 text-[12px] font-semibold text-[#004272] bg-white bg-white` : ` border mr-2 pl-3 pr-3 pt-2 pb-2 text-[12px] font-semibold text-[#720058] bg-white`}>Following</button>
                </div>
                <div className='h-[1px] w-full border border-b'></div>
                <div className='w-full flex justify-center pt-2'>
                       <img src="" alt="" />
                      {myPosts && <UserPosts id={userId}/>}
                       <NotificationCase/>
                </div>
            </div>
        </>

    )
}

export default ProfileContainer
