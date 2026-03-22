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
    const { badges } = useSelector(state => state.leaderboard)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [myPostsMenu, setMyPostsMenu] = useState(true)
    const [savedPostsMenu, setSavedPostsMenu] = useState(false)
    const [followers, setFollowers] = useState(false)
    const [following, setFollowing] = useState(false)
    const [modal, setModal] = useState(false)
    const [totalStars, setTotalStars] = useState(0)
    const [badge, setBadge] = useState({})


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
                const badgeData = badges.find(ele => ele._id === action.payload.badge)
                setBadge(badgeData)
            }
        })
    }, [userId, dispatch, navigate, badges])

    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        console.log("banner");
        
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
            <div className='relative w-full h-[150px] md:h-[250px] bg-slate-100 overflow-hidden group rounded-t-3xl'>
                <img className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105' src={user.banner_url || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"} alt="user_banner" />
                {userId === userInfo?.devGlowAccess._id && (
                    <div className='absolute top-4 right-4'>
                        <form onSubmit={setBanner}>
                            <label className='cursor-pointer bg-white/50 hover:bg-white backdrop-blur-md p-2 rounded-full shadow-sm transition-all flex items-center justify-center h-10 w-10'>
                                <img
                                    className='w-5 opacity-80'
                                    src="/editPen.png"
                                    alt="Edit Banner"
                                    onClick={triggerFileInputClick}
                                />
                                <input
                                    type="file"
                                    id='fileUpload'
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onInput={handleFileChange}
                                />
                            </label>
                        </form>
                    </div>
                )}
            </div>
            
            <div className='hidden lg:flex w-full px-8 pb-8 pt-4 justify-between relative bg-white'>
                <div className='flex gap-6'>
                    <div className='w-[150px] h-[150px] rounded-full border-4 border-white shadow-md relative -mt-[75px] overflow-hidden bg-slate-100 flex-shrink-0'>
                        <img className="w-full h-full object-cover" src={user?.profile_url || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSinUiRqVB94sfZZbtNZgPJswUTs4R7YDskvXfVjUSejKfQqAoMaedQBNfybdIdduiix4&usqp=CAU"} alt="profile pic" />
                    </div>
                    
                    <div className='flex flex-col pt-2'>
                        <h2 className='text-2xl font-bold text-slate-800'>{user?.username ?? "Unknown"} <span className='text-sm font-normal text-slate-500 ml-2'>{user?.gender ?? "No gender specified"}</span></h2>
                        <div className='flex items-center gap-2 mt-1'>
                            <p className='text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full'>{badge?.badge_name ?? "Badge not earned!"}</p>
                            <div className='flex text-amber-500 items-center bg-amber-50 px-3 py-1 rounded-full'>
                                <span className='text-sm font-semibold mr-1'>{totalStars ?? "0"}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>
                            </div>
                        </div>
                        <p className='font-normal text-slate-600 mt-4 max-w-md'>{user?.about ?? "A mystery developer yet to set their bio!"}</p>
                        <div className="mt-3 w-64 max-w-full">
                           <ProgressBar bgcolor="#fbbf24" progress={totalStars} height={6} />
                        </div>
                    </div>
                </div>

                <div className='flex gap-8 items-start pt-4'>
                    <div className='flex flex-col items-center'>
                        <div className='flex gap-6 mb-4'>
                            <div className='text-center'>
                                <p className='text-xl font-bold text-slate-800'>{user?.followers?.length ?? "0"}</p>
                                <p className='text-xs font-semibold text-slate-400 uppercase tracking-wider'>Followers</p>
                            </div>
                            <div className='text-center'>
                                <p className='text-xl font-bold text-slate-800'>{user?.following?.length ?? "0"}</p>
                                <p className='text-xs font-semibold text-slate-400 uppercase tracking-wider'>Following</p>
                            </div>
                        </div>
                        <div className='w-16 h-16 rounded-full overflow-hidden shadow-sm border border-slate-100'>
                            <img className="w-full h-full object-cover" src={badge?.badge_url || "https://img.freepik.com/free-vector/shield_24908-54457.jpg?size=626&ext=jpg"} alt="badge" />
                        </div>
                    </div>

                    <div className='pt-1'>
                        {userId === userInfo?.devGlowAccess._id ? (
                            <button onClick={() => setModal(true)} className='px-6 py-2 bg-indigo-50 text-indigo-700 font-semibold rounded-xl hover:bg-indigo-100 transition-colors shadow-sm'>Edit Profile</button>
                        ) : (
                            <FollowToggle userData={user} />
                        )}
                    </div>
                </div>
            </div>
            {/* Mobile screen  */}
            <div className='flex flex-col lg:hidden w-full bg-white relative'>
                <div className='flex items-end justify-between px-4 pb-4'>
                    <div className='w-[100px] h-[100px] rounded-full border-4 border-white shadow-md relative -mt-[50px] overflow-hidden bg-slate-100 flex-shrink-0'>
                        <img className="w-full h-full object-cover" src={user?.profile_url || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSinUiRqVB94sfZZbtNZgPJswUTs4R7YDskvXfVjUSejKfQqAoMaedQBNfybdIdduiix4&usqp=CAU"} alt="profile pic" />
                    </div>
                    <div className='flex items-center gap-4 mb-2'>
                        <div className='w-12 h-12 rounded-full overflow-hidden shadow-sm border border-slate-100'>
                            <img className="w-full h-full object-cover" src={badge?.badge_url || "https://img.freepik.com/free-vector/shield_24908-54457.jpg?size=626&ext=jpg"} alt="badge" />
                        </div>
                        {userInfo?.devGlowAccess._id !== user._id ? <FollowToggle userData={user} /> : <button onClick={() => setModal(true)} className='px-4 py-2 bg-indigo-50 text-indigo-700 font-semibold rounded-xl text-sm shadow-sm'>Edit Profile</button>}
                    </div>
                </div>
                
                <div className='px-4 pb-4'>
                    <h2 className='text-xl font-bold text-slate-800'>{user?.username ?? "Unknown"}</h2>
                    <p className='text-sm text-slate-500 bg-slate-100 inline-block px-2 py-0.5 rounded-md mt-1 mb-2'>{badge?.badge_name ?? "Badge not earned!"}</p>
                    <p className='font-normal text-slate-600 text-sm mb-3'>{user?.about ?? "Set profile now!"}</p>
                    
                    <div className='flex items-center gap-4 text-sm font-semibold text-slate-700'>
                        <div><span className='text-slate-800'>{user?.followers?.length ?? "0"}</span> <span className='text-slate-500 font-normal'>Followers</span></div>
                        <div><span className='text-slate-800'>{user?.following?.length ?? "0"}</span> <span className='text-slate-500 font-normal'>Following</span></div>
                        <div className='flex items-center text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full'>
                            <span className='mr-1'>{totalStars ?? "0"}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>
                        </div>
                    </div>
                    <div className="mt-4 w-full">
                       <ProgressBar bgcolor="#fbbf24" progress={totalStars} height={6} />
                    </div>
                </div>
            </div>
            <div className='h-auto w-full px-4 rounded-b-3xl bg-slate-50 border-t border-slate-100'>
                <div className='w-full flex mt-4 mb-2 gap-2 overflow-x-auto scroller-hidden'>
                    <button onClick={() => menu("openPosts")} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${myPostsMenu ? 'bg-indigo-600 text-white shadow-soft' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'}`}>{userId === userInfo?.devGlowAccess._id ? "My posts" : "Posts"}</button>
                    {userId === userInfo?.devGlowAccess._id && <button onClick={() => menu("openSavedPost")} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${savedPostsMenu ? 'bg-indigo-600 text-white shadow-soft' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'}`}>Saved posts</button>}
                    <button onClick={() => menu("openFollowers")} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${followers ? 'bg-indigo-600 text-white shadow-soft' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'}`}>Followers</button>
                    <button onClick={() => menu("openFollowing")} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${following ? 'bg-indigo-600 text-white shadow-soft' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'}`}>Following</button>
                </div>
                <div className='h-[1px] w-full border border-b'></div>
                <div className='w-full flex justify-center pt-2 bg-custom-bg'>
                    {savedPostsMenu && <CommunityCase />}
                    {myPostsMenu && <CommunityCase />}
                    {savedPostsMenu && userId === userInfo?.devGlowAccess._id && <SavedPosts />}
                    {followers && <SuggestionsCase />}
                    {following && <SuggestionsCase />}
                    {following && <Following user={user} />}
                    {followers && <Followers user={user} />}
                    {myPostsMenu && <UserPosts id={userId} />}
                    <NotificationCase />
                </div>
            </div>
            {modal && userId === userInfo?.devGlowAccess._id ?
                <EditProfile setModal={setModal} setUser={setUser} />
                : null}
        </>

    )
}

ProfileContainer.propTypes = {
    userId: PropTypes.string.isRequired,
};

export default ProfileContainer
