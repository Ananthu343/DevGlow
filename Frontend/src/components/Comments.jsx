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
      <div className={`w-full h-auto py-2 mb-1 text-sm flex flex-col border-l-2 transition-all ${border ?? "border-slate-200 ml-1"}`}>
        <div className='w-full flex items-start gap-3 pl-3'>
          <div className='w-8 h-8 rounded-full overflow-hidden flex-shrink-0 shadow-sm border border-slate-200 mt-1'>
            <img className='w-full h-full object-cover' src={userData?.profile_url ? userData?.profile_url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSinUiRqVB94sfZZbtNZgPJswUTs4R7YDskvXfVjUSejKfQqAoMaedQBNfybdIdduiix4&usqp=CAU"} alt="profilepic" />
          </div>
          <div className='flex flex-col flex-grow'>
            <div className='bg-slate-50 border border-slate-100 rounded-2xl rounded-tl-sm p-3 shadow-sm'>
              <p className='text-xs font-bold text-slate-800 hover:text-indigo-600 hover:underline cursor-pointer mb-1 transition-colors'>{userData?.username}</p>
              <p className='text-slate-700 leading-relaxed text-[13px]'>{comment?.content}</p>
            </div>
            
            <div className='w-full flex justify-between items-center mt-1.5 px-1'>
              <p className='text-[11px] font-medium text-slate-400'>{timeAgo(comment.createdAt)}</p>
              <div className='flex items-center gap-3'>
                {comment.replies.length > 0 && <p onClick={() => setShowReplies(!showReplies)} className='text-[11px] font-semibold cursor-pointer text-indigo-500 hover:text-indigo-700 transition-colors'>{showReplies ? "Hide replies" : `${comment.replies.length} replies`}</p>}
                {(userInfo?.devGlowAccess?._id === comment?.creatorId || userInfo?.devGlowAccess?._id === postCreator) && <p onClick={() => dispatch(deleteComment(comment._id))} className='cursor-pointer hover:text-red-700 text-[11px] font-semibold text-red-500 transition-colors'>Delete</p>}
                <p onClick={() => openReplyBox(!replyBox)} className='cursor-pointer text-slate-500 hover:text-slate-800 text-[11px] font-semibold transition-colors'>Reply</p>
              </div>
            </div>
          </div>
        </div>
        
        {replyBox &&
          <div className='mt-3 w-full flex items-center gap-2 pl-12 pr-2'>
            <input type="text" placeholder="Write a reply..." className='px-3 rounded-lg h-9 flex-grow border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-[13px] bg-slate-50 transition-all' value={content} onChange={(e) => setContent(e.target.value)} />
            <div className='flex items-center gap-2 relative'>
              <div onClick={() => setOpenEmoji(!openEmoji)} className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors">
                <span className="text-sm">😀</span>
              </div>
              <button onClick={handleCommentPost} className='bg-indigo-600 hover:bg-indigo-700 transition-colors text-white text-[12px] font-semibold rounded-lg px-4 h-9 shadow-sm'>Reply</button>
              
              {openEmoji && (
                <div className='absolute z-50 right-0 top-10 shadow-glass rounded-xl overflow-hidden'>
                  <EmojiPicker onEmojiClick={handleEmojiSelect} />
                </div>
              )}
            </div>
          </div>
        }

        {showReplies && (
          <div className='w-full pl-6 mt-3'>
            {comment?.replies && comment?.replies.map(replyId => {
              const reply = commentsById[replyId];
              const uniqueKey = `${comment.id}-${replyId}`;
              return <Comments key={uniqueKey} comment={reply} commentsById={commentsById} border={"border-slate-300 ml-3"} />;
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
