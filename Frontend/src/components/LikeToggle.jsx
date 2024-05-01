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
    }, []); // This effect updates the likeStatus state whenever posts or userInfo changes

    const handleLike = (id) => {
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
    };

    return (
        <p className={likeStatus ? 'flex items-center cursor-pointer hover:text-red-600' :
          'flex items-center cursor-pointer hover:text-blue-600'} onClick={() => handleLike(document._id)}>
            {likeStatus ? <img className='w-5 mr-1' src="star.webp" alt="" />
            :<img className='w-4 mr-1' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-46x5pNNfZa2FMULwpwbYsb1Rqe2S0NMlZ2mtJDi_ZA&s" alt="" />
            }{likeStatus ? "Unlike" : "Like"}
        </p>
    );
}

export default LikeToggle;
