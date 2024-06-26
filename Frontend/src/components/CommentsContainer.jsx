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
    <div className='bg-white rounded-b border-t p-3'>
      <div className='w-full flex jusify-between p-2'>
        <input type="text" className='pl-2 rounded h-7 w-[50%] border border-2 focus:outline-[#720058] text-sm' value={content} onChange={(e) => setContent(e.target.value)} />
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
      <div className=' w-full h-[200px] custom-scrollbar overflow-y-scroll rounded-t border-t border-2 border-gray-300 p-3'>
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
