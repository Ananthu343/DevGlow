import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likePost } from '../slices/postSlice';
import toast from 'react-hot-toast';

const LikeToggle = ({ document }) => {
    const [likeStatus, setLikeStatus] = useState(null);
    const { userInfo } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (document?.likedUsers?.includes(userInfo?.devGlowAccess._id)) {
            setLikeStatus(true)
        }else{
            setLikeStatus(false);
        }
    }, [userInfo?.devGlowAccess._id,document?.likedUsers]); // This effect updates the likeStatus state whenever posts or userInfo changes

    const handleLike = (id) => {
       if(userInfo){
        setLikeStatus(!likeStatus)
        dispatch(likePost(id)).then((action) => {
            if (action.meta.requestStatus === "fulfilled") {
                const newLikeStatus = action.payload.likeStatus;
                setLikeStatus(newLikeStatus)
            } else if (action.meta.requestStatus === "rejected") {
                const errorMessage = "Something went wrong";
                toast.error(errorMessage);
            }
        });
       }else{
        toast.error("You need to login")
       }
    };

    return (
        <p className={likeStatus ? 'flex items-center cursor-pointer hover:text-red-600 p-2 hover:bg-gray-100' :
          'flex items-center cursor-pointer hover:text-blue-600 p-2 hover:bg-gray-100'} onClick={() => handleLike(document._id)}>
            {likeStatus ?<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gold" class="size-5">
            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
          </svg>
            :
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
        </svg>
          
            }{likeStatus ? "Unlike" : "Like"}
        </p>
    );
}

export default LikeToggle;
