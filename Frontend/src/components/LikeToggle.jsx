import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likePost } from '../slices/postSlice';
import toast from 'react-hot-toast';

const LikeToggle = ({ posts, document }) => {
    const [likes,setLikes] = useState(document.likedUsers)
    const [likeStatus, setLikeStatus] = useState({});
    const { userInfo } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const initialLikeStatus = {};
        posts.forEach(post => {
            // Check if the current user's ID is in the post's likedUsers array
            initialLikeStatus[post._id] = post.likedUsers?.includes(userInfo?.id);
        });
        setLikeStatus(initialLikeStatus);
    }, [posts, userInfo]); // This effect updates the likeStatus state whenever posts or userInfo changes

    const handleLike = (id) => {
        dispatch(likePost(id)).then((action) => {
            if (action.meta.requestStatus === "fulfilled") {
                const newLikeStatus = action.payload.likeStatus;
                setLikeStatus(prevStatus => ({
                    ...prevStatus,
                    [id]: newLikeStatus,
                }));
                setLikes(likes+1)
            } else if (action.meta.requestStatus === "rejected") {
                const errorMessage = "Something went wrong";
                toast.error(errorMessage);
            }
        });
    };

    return (
        <p className='flex items-center cursor-pointer' onClick={() => handleLike(document._id)}>
            <img className='w-5 mr-1' src="star.webp" alt="" />
            {likeStatus[document._id] ? "Unlike" : "Like"}
        </p>
    );
}

export default LikeToggle;
