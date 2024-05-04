import React,{useState,useEffect} from 'react'
import { followUser } from '../slices/postSlice';
import toast from 'react-hot-toast';
import { useDispatch,useSelector} from 'react-redux';

const FollowToggle = ({userData}) => {
    const { userInfo } = useSelector(state => state.auth);
    const [followStatus, setFollowStatus] = useState(null);
    const dispatch = useDispatch()

    useEffect(() => {
        if (userData?.followers?.includes(userInfo?.devGlowAccess._id)) {
            setFollowStatus(true)
        } else {
            setFollowStatus(false)
        }
      }, [userData,userInfo?.devGlowAccess._id]);
    
      const handleFollow = (id) => {
        if (userInfo) {
            setFollowStatus(!followStatus)
            dispatch(followUser(id)).then((action) => {
                if (action.meta.requestStatus === "fulfilled") {
                  const newFollowStatus = action.payload.followStatus;
                  setFollowStatus(newFollowStatus)
                } else if (action.meta.requestStatus === "rejected") {
                    const errorMessage = "Something went wrong";
                    toast.error(errorMessage);
                    setFollowStatus(false)
                }
              });
        }else{
            toast.error("You need to login")
        }
      };

  return (
    <>
      {userInfo?.devGlowAccess._id !== userData?._id && (
                    <button
                      onClick={() => handleFollow(userData?._id)}
                      className="text-xs cursor-pointer text-[#004272] font-semibold mr-5"
                    >
                      {followStatus ? "Unfollow" : "Follow"}
                    </button>
      )}
    </>
  )
}

export default FollowToggle
