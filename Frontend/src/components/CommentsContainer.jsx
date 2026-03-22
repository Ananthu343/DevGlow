import React, { useEffect, useState, useCallback } from 'react';
import Comments from './Comments';
import EmojiPicker from 'emoji-picker-react';
import { commentOnPost } from '../slices/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types'

const CommentsContainer = ({ postId }) => {
  const { commentsById } = useSelector(state => state.post)
  const [content, setContent] = useState("");
  const [openEmoji, setOpenEmoji] = useState(false);
  const dispatch = useDispatch()

  const [replies, setReplies] = useState([])

  const handleCommentPost = useCallback(() => {
    const data = {
      postId,
      content
    }
    dispatch(commentOnPost(data))
    setContent("")
  }, [content, dispatch, postId]);

  useEffect(() => {
    let replies = []
    Object.values(commentsById).forEach(ele => {
      if (ele.postId === postId) {
        replies.push(...ele.replies)
      }
    })
    setReplies(replies)
    return () => setReplies([])
  }, [handleCommentPost, commentsById, postId])

  const handleEmojiSelect = (emoji) => {
    setContent(prevContent => prevContent + emoji.emoji);
    setOpenEmoji(false);
  };


  return (
    <div className='bg-slate-50/50 rounded-b-2xl border-t border-slate-100 p-4'>
      <div className='w-full flex justify-between items-center mb-4 gap-3'>
        <input type="text" placeholder="Write a comment..." className='px-4 rounded-xl h-10 w-full border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm shadow-sm transition-all' value={content} onChange={(e) => setContent(e.target.value)} />
        <div className='flex items-center gap-3 flex-shrink-0 relative'>
          <div onClick={() => setOpenEmoji(!openEmoji)} className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors">
            <span className="text-xl">😀</span>
          </div>
          <button onClick={handleCommentPost} className='bg-indigo-600 hover:bg-indigo-700 transition-colors text-white text-sm font-semibold rounded-xl px-5 h-10 shadow-sm'>Post</button>
          
          {openEmoji && (
            <div className='absolute z-50 right-0 top-12 shadow-glass rounded-xl overflow-hidden'>
              <EmojiPicker onEmojiClick={handleEmojiSelect} />
            </div>
          )}
        </div>
      </div>
      <div className='w-full max-h-[250px] overflow-y-auto rounded-xl bg-white border border-slate-100 p-2 shadow-inner custom-scrollbar'>
        {Object.values(commentsById).map(comment => (
          !replies.includes(comment._id) && comment.postId === postId && <Comments key={comment.createdAt} comment={comment} commentsById={commentsById} />
        ))}
      </div>
    </div>
  );
}

CommentsContainer.propTypes = {
  postId: PropTypes.string.isRequired,
};

export default CommentsContainer;
