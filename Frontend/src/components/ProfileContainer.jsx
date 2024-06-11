import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../slices/userSlice'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { setBanner } from '../slices/userSlice'
import ProgressBar from './Progressbar'
import NotificationCase from './NotificationCase'
import UserPosts from './UserPosts'
import CommunityCase from './CommunityCase'
import SavedPosts from './SavedPosts'
import SuggestionsCase from './SuggestionsCase'
import Followers from './Followers'
import Following from './Following'
import EditProfile from './EditProfile'
import PropTypes from 'prop-types'
import FollowToggle from './FollowToggle'

const ProfileContainer = ({ userId }) => {
    const { profilePosts } = useSelector(state => state.post)
    const { userInfo } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [myPostsMenu, setMyPostsMenu] = useState(true)
    const [savedPostsMenu, setSavedPostsMenu] = useState(false)
    const [followers, setFollowers] = useState(false)
    const [following, setFollowing] = useState(false)
    const [modal, setModal] = useState(false)
    const [totalStars, setTotalStars] = useState(0)


    useEffect(() => {
        let posts = profilePosts ? profilePosts : [];
        posts = posts.filter(ele => ele.creatorId === userId)
        let count = posts.reduce((acc, cur) => {
            return acc += cur?.likedUsers?.length
        }, 0)
        setTotalStars(count)

    }, [profilePosts, userId, user])

    const menu = (choice) => {
        switch (choice) {
            case "openPosts":
                setMyPostsMenu(true)
                setSavedPostsMenu(false)
                setFollowers(false)
                setFollowing(false)
                break;
            case "openSavedPost":
                setMyPostsMenu(false)
                setSavedPostsMenu(true)
                setFollowers(false)
                setFollowing(false)
                break;
            case "openFollowers":
                setMyPostsMenu(false)
                setSavedPostsMenu(false)
                setFollowers(true)
                setFollowing(false)
                break;
            case "openFollowing":
                setMyPostsMenu(false)
                setSavedPostsMenu(false)
                setFollowers(false)
                setFollowing(true)
                break;

            default:
                break;
        }
    }

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
    }, [userId, dispatch, navigate])

    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('fileUpload', file);
            dispatch(setBanner(formData)).then((action) => {
                if (action.meta.requestStatus === "rejected") {
                    const errorMessage = "Something went wrong!";
                    toast.error(errorMessage);
                } else {
                    setUser(action.payload)
                }
            });
            fileInputRef.current.value = '';
        }
    };

    const triggerFileInputClick = () => {
        fileInputRef.current.click();
    };

    return (
        <>
            <div className='flex'>
                <img className='md:rounded-t-2xl w-full md:h-[200px]' src={user.banner_url ? user.banner_url : "https://pulsegp.com/wp-content/themes/leahy/assets/images/default-banner.png"} alt="user_banner" />
                <div className='w-full md:w-[85%] h-auto absolute flex justify-end pt-3 pr-3'>
                    <form onSubmit={setBanner}>
                        <img
                            className='w-5 rounded-full cursor-pointer'
                            src="editPen.png"
                            alt=""
                            onClick={triggerFileInputClick}
                        />
                        <input
                            type="file"
                            id='fileUpload'
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onInput={handleFileChange}
                        />
                    </form>
                </div>
            </div>
            <div className='w-full p-3 h-auto flex justify-around'>
                <div className='border-2 border-[#720058] w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-full mt-[-50px] ml-[40%] md:ml-[5%] overflow-hidden'>
                    <img src={user?.profile_url ? user.profile_url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSinUiRqVB94sfZZbtNZgPJswUTs4R7YDskvXfVjUSejKfQqAoMaedQBNfybdIdduiix4&usqp=CAU"} alt="profile pic" />
                </div>
                <div className='flex'>
                    <div className='flex-col justify-between w-[40%]'>
                        <h2 className='text-xl font-semibold'>{user?.username ?? "Unknown"}</h2>
                        <p className='text-xs text-[#979797] mb-2'>{user?.gender ?? "He/She"}</p>
                        <p className='text-xs text-[#979797]'>{user?.badge ?? "Badge not earned!"}</p>
                        <div className='flex items-center mt-2'>
                            <p className='text-sm font-medium'>{totalStars ?? "0"}</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                            </svg>

                        </div>
                    </div>
                    <div className='flex justify-between pt-5 pl-5 w-[180px] ml-[100px] lg:ml-[0px]'>
                        <p className='text-xs font-bold text-[#004272]'>{user?.followers?.length ?? "0"} Followers</p>
                        <p className='text-xs font-bold text-[#004272]'>{user?.following?.length ?? "0"} Following</p>
                    </div>
                </div>
                <div className=' overflow-wrap-break-word flex flex-col items-center mt-5 w-[50%]'>
                    <ProgressBar bgcolor="gold" progress={totalStars} height={5} />
                    <p className='font-semibold text-sm mt-4'>{user?.about ?? "Set profile now!"}</p>
                </div>
                {
                    userId === userInfo.devGlowAccess._id ?
                        <div className='flex-col'>
                            <p className='text-xs text-[#979797] mb-1'>Settings</p>
                            <p onClick={() => setModal(true)} className='text-xs font-bold #004272] cursor-pointer'>Edit profile</p>
                        </div> :
                        <FollowToggle userData={user} />
                }
            </div>
            <div className='h-auto w-full p-4'>
                <div className='w-full flex mt-2 mb-2  '>
                    <button onClick={() => menu("openPosts")} className={myPostsMenu ? `shadow-lg border mr-2 pl-3 pr-3 pt-2 pb-2 text-[12px] font-semibold text-[#004272] bg-white` : ` border mr-2 pl-3 pr-3 pt-2 pb-2 text-[12px] font-semibold text-[#720058] bg-white`}>{userId === userInfo.devGlowAccess._id ? "My posts" : "Posts"}</button>
                    {userId === userInfo.devGlowAccess._id ? <button onClick={() => menu("openSavedPost")} className={savedPostsMenu ? `shadow-lg border mr-2 pl-3 pr-3 pt-2 pb-2 text-[12px] font-semibold text-[#004272] bg-white bg-white` : ` border mr-2 pl-3 pr-3 pt-2 pb-2 text-[12px] font-semibold text-[#720058] bg-white`}>Saved posts</button> : null}
                    <button onClick={() => menu("openFollowers")} className={followers ? `shadow-lg border mr-2 pl-3 pr-3 pt-2 pb-2 text-[12px] font-semibold text-[#004272] bg-white bg-white` : ` border mr-2 pl-3 pr-3 pt-2 pb-2 text-[12px] font-semibold text-[#720058] bg-white`}>Followers</button>
                    <button onClick={() => menu("openFollowing")} className={following ? `shadow-lg border mr-2 pl-3 pr-3 pt-2 pb-2 text-[12px] font-semibold text-[#004272] bg-white bg-white` : ` border mr-2 pl-3 pr-3 pt-2 pb-2 text-[12px] font-semibold text-[#720058] bg-white`}>Following</button>
                </div>
                <div className='h-[1px] w-full border border-b'></div>
                <div className='w-full flex justify-center pt-2 bg-custom-bg'>
                    {savedPostsMenu && <CommunityCase />}
                    {myPostsMenu && <CommunityCase />}
                    {savedPostsMenu && userId === userInfo.devGlowAccess._id && <SavedPosts />}
                    {followers && <SuggestionsCase />}
                    {following && <SuggestionsCase />}
                    {following && <Following user={user} />}
                    {followers && <Followers user={user} />}
                    {myPostsMenu && <UserPosts id={userId} />}
                    <NotificationCase />
                </div>
            </div>
            {modal && userId === userInfo.devGlowAccess._id ?
                <EditProfile setModal={setModal} setUser={setUser} />
                : null}
        </>

    )
}

ProfileContainer.propTypes = {
    userId: PropTypes.string.isRequired,
};

export default ProfileContainer
