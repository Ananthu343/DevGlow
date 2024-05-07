import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { getUser } from '../slices/userSlice'
import { getPost } from '../slices/postSlice'
import { useDispatch } from 'react-redux'
import NotificationCase from './NotificationCase'
import LeaderboardCase from './LeaderboardCase'
import toast from 'react-hot-toast'

const PostDisplay = () => {
    const {postId} = useParams()
    const dispatch = useDispatch()
    const [postData,setPostData] = useState(null)
    const [userData,setUserData] = useState(null)
console.log(postData,userData);
useEffect(() => {
    dispatch(getPost(postId)).then((action) => {
       if (action.meta.requestStatus === "rejected") {
         const errorMessage = "Something went wrong";
         toast.error(errorMessage);
       } else {
         setPostData(action.payload);
         dispatch(getUser(action.payload.creatorId)).then((userAction) => {
           if (userAction.meta.requestStatus === "rejected") {
             const errorMessage = "Something went wrong";
             toast.error(errorMessage);
           } else {
             setUserData(userAction.payload);
           }
         });
       }
    });
   }, [dispatch, postId]); // Ensure postId is included in the dependency array
   

  return (
     <div className=' w-[85%] pt-[60px] flex justify-center  top-0 mx-auto'>
      <NotificationCase />
      <div className='w-full md:w-[550px] h-[500px] flex-col md:p-4'>
            
        </div>
      <LeaderboardCase />
    </div>
  )
}

export default PostDisplay
