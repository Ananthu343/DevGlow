import React,{useState,useEffect} from 'react'
import { followUser } from '../slices/userSlice';
import toast from 'react-hot-toast';
import { useDispatch,useSelector} from 'react-redux';

const FollowToggle = ({userData,posts}) => {
    
    const {users } = useSelector(state => state.post);
    const { userInfo } = useSelector(state => state.auth);
    const [followStatus, setFollowStatus] = useState({});
    const dispatch = useDispatch()

    useEffect(() => {
        const initialFollowStatus = {};
        posts.forEach(post => {
          const userData = users.find(user => user._id === post.creatorId);
          if (userData) {
            initialFollowStatus[userData._id] = userData.followers?.includes(userInfo.devGlowAccess?._id);
            console.log(initialFollowStatus);
          }
        });
        setFollowStatus(initialFollowStatus);
      }, [posts, users, userInfo]);
    
      const handleFollow = (id) => {
        dispatch(followUser(id)).then((action) => {
          if (action.meta.requestStatus === "fulfilled") {
            const newFollowStatus = action.payload.followStatus;
            setFollowStatus(prevStatus => ({
              ...prevStatus,
              [id]: newFollowStatus,
            }));
          } else if (action.meta.requestStatus === "rejected") {
            const errorMessage = "Something went wrong";
            toast.error(errorMessage);
          }
        });
      };

  return (
    <>
      {userInfo?.devGlowAccess._id !== userData?._id && (
                    <button
                      onClick={() => handleFollow(userData?._id)}
                      className="text-xs cursor-pointer text-[#004272] font-semibold mr-5"
                    >
                      {followStatus[userData?._id] ? "Unfollow" : "Follow"}
                    </button>
      )}
    </>
  )
}

export default FollowToggle
