import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import EmojiPicker from 'emoji-picker-react';
import { commentOnPost, deleteComment } from '../slices/postSlice';
import { timeAgo } from '../utils/timeAgo';
import PropTypes from 'prop-types'

const Comments = ({ comment, commentsById, border }) => {
  const { users, feed } = useSelector(state => state.post)
  const { userInfo } = useSelector(state => state.auth)
  const userData = users.find(ele => ele._id === comment?.creatorId)
  const [replyBox, openReplyBox] = useState(false);
  const [postCreator, setPostCreator] = useState(null);
  const [content, setContent] = useState("");
  const [showReplies, setShowReplies] = useState(false);
  const [openEmoji, setOpenEmoji] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    const postData = feed.find(ele => ele._id === comment?.postId)
    setPostCreator(postData?.creatorId)
  }, [feed, comment])

  const handleEmojiSelect = (emoji) => {
    setContent(prevContent => prevContent + emoji.emoji);
    setOpenEmoji(false);
  };

  const handleCommentPost = () => {
    const data = {
      postId: comment.postId,
      content,
      commentId: comment._id
    }
    dispatch(commentOnPost(data))
    setContent("")
    openReplyBox(false)
  }
  return (
    <div>
      <div className={`w-[90%] h-auto p-3 mb-2 text-sm flex flex-col overflow-auto border-l ${border ?? "border-[#720058]"}`}>
        <div className='w-auto h-auto flex items-center justify-between'>
          <div className='border border-[#720058] rounded-full overflow-hidden mr-2'>
            <img className='w-[30px] h-[30px] object-cover' src={userData?.profile_url ? userData?.profile_url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSinUiRqVB94sfZZbtNZgPJswUTs4R7YDskvXfVjUSejKfQqAoMaedQBNfybdIdduiix4&usqp=CAU"} alt="profilepic" />
          </div>
          <div className='flex flex-col w-[90%] items-between bg-gray-200 rounded-lg p-3 shadow'>
            <p className='text-xs font-semibold hover:underline cursor-pointer mb-2'>{userData?.username}</p>
            <p>{comment?.content}</p>
          </div>
        </div>
        <div className='w-full flex justify-between mt-2'>
          <p className='text-[11px] text-[#979797]'>{timeAgo(comment.createdAt)}</p>
          <div className='flex'>
            {comment.replies.length > 0 ? <p onClick={() => setShowReplies(!showReplies)} className='text-xs mr-2 cursor-pointer text-blue-600 hover:underline'>{showReplies ? "Hide" : comment.replies.length} replies</p> : null}
            {userInfo?.devGlowAccess?._id === comment?.creatorId || userInfo?.devGlowAccess?._id === postCreator ? <p onClick={() => dispatch(deleteComment(comment._id))} className='cursor-pointer hover:underline text-xs mr-2 text-red-600'>Remove</p> : null}
            <p onClick={() => openReplyBox(!replyBox)} className='cursor-pointer hover:underline text-xs'>Reply</p>
          </div>
        </div>
        {replyBox &&
          <div className='p-3 w-full flex justify-between'>
            <input type="text" className='pl-2 rounded h-7 w-[60%] border border-2 focus:outline-[#720058] text-sm' value={content} onChange={(e) => setContent(e.target.value)} />
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

        {showReplies && (
          <div className=' w-[99%]'>
            {comment?.replies && comment?.replies.map(replyId => {
              const reply = commentsById[replyId];
              const uniqueKey = `${comment.id}-${replyId}`;
              return <Comments key={uniqueKey} comment={reply} commentsById={commentsById} border={"border-blue-500"} />;
            })}
          </div>
        )}
      </div>
    </div>
  )
}

Comments.propTypes = {
  comment: PropTypes.object.isRequired,
  commentsById: PropTypes.object.isRequired,
  border: PropTypes.string,
};

export default Comments
