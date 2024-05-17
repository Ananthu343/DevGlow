import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import EmojiPicker from 'emoji-picker-react';
import { commentOnPost,deleteComment} from '../slices/postSlice';
import { timeAgo } from '../utils/timeAgo';

const Comments = ({ comment, commentsById, size }) => {
  const { users } = useSelector(state => state.post)
  const userData = users.find(ele => ele._id === comment?.creatorId)
  const [replyBox,openReplyBox] = useState(false);
  const [content, setContent] = useState("");
  const [openEmoji, setOpenEmoji] = useState(false);
  const dispatch = useDispatch()
   
  const handleEmojiSelect = (emoji) => {
    setContent(prevContent => prevContent + emoji.emoji); 
    setOpenEmoji(false); 
};


const handleCommentPost = () =>{
  const data = {
    postId : comment.postId,
    content,
    commentId:comment._id
  }
  dispatch(commentOnPost(data))
  openReplyBox(false)
}

  return (
    <div>
      <div className={`w-[${size}%] h-auto border p-3 mb-2 text-sm flex flex-col rounded-lg overflow-auto shadow-lg`}>
        <div className='w-auto h-auto flex items-center justify-between'>
          <div className='flex items-center'>
          <div className='border border-[#720058] rounded-full overflow-hidden mr-2'>
            <img className='w-[20px] h-[20px] object-cover' src={userData?.profile_url ? userData?.profile_url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSinUiRqVB94sfZZbtNZgPJswUTs4R7YDskvXfVjUSejKfQqAoMaedQBNfybdIdduiix4&usqp=CAU"} alt="profilepic" />
          </div>
          <p className='text-xs font-semibold hover:text-blue-500 cursor-pointer'>{userData?.username}</p>
          </div>
          <p className='text-[11px] text-[#979797]'>{timeAgo(comment.createdAt)}</p>
        </div>
        <p>{comment?.content}</p>
        <div className='w-full flex justify-end '>
            <p onClick={()=> dispatch(deleteComment(comment._id))} className='cursor-pointer hover:underline text-xs mr-2 text-red-600'>Remove</p>
            <p onClick={()=> openReplyBox(true)} className='cursor-pointer hover:underline text-xs'>Reply</p>
        </div>
        {replyBox && 
        <div className='p-3 w-full flex justify-between'>
           <input type="text" className='pl-2 rounded h-7 w-[60%] border border-2 focus:outline-[#720058] text-sm' value={content} onChange={(e) => setContent(e.target.value)}/>
           <div className='flex w-[30%] justify-around'>
                    <img onClick={() => setOpenEmoji(!openEmoji)} className="w-6 cursor-pointer" src="https://static.vecteezy.com/system/resources/previews/011/855/241/non_2x/cheerful-emoji-icon-perfect-for-website-or-social-media-application-sign-and-symbol-vector.jpg" alt="" />
                    <button onClick={handleCommentPost} className='bg-[#720058] text-white text-sm font-semibold rounded pl-2 pr-2'>Post</button>
            </div>
            <div className='absolute mt-7'>
              {openEmoji && (
                <div className='absolute mt-3'>
                  <EmojiPicker onEmojiClick={handleEmojiSelect} />
                </div>
              )}
            </div>
        </div>
        }
        
      </div>
      {comment?.replies && comment?.replies.map(replyId => {
        const reply = commentsById[replyId];
        const uniqueKey = `${comment.id}-${replyId}`;
        return <Comments key={uniqueKey} comment={reply} commentsById={commentsById} size={50} />;
      })}
    </div>
  )
}

export default Comments
