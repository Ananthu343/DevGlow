import React, { useState } from 'react';
import Comments from './Comments';
import EmojiPicker from 'emoji-picker-react';
import { commentOnPost} from '../slices/postSlice';
import { useDispatch,useSelector } from 'react-redux';

const CommentsContainer = ({postId}) => {
    const {commentsById} = useSelector(state => state.post)
    const [content, setContent] = useState("");
    const [openEmoji, setOpenEmoji] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState(""); // Temporary state for emoji
    const dispatch = useDispatch()

    const handleEmojiSelect = (emoji) => {
        setSelectedEmoji(emoji.emoji); // Set the selected emoji
        setContent(prevContent => prevContent + selectedEmoji); // Append the emoji to the content
        setOpenEmoji(false); // Close the emoji picker
    };

    const handleCommentPost = () =>{
      const data = {
        postId,
        content
      }
      dispatch(commentOnPost(data))
    }
    return (
        <div className='bg-white rounded-b border-t p-3'>
            <div className='w-full flex jusify-between p-2'>
                <input type="text" className='pl-2 rounded h-7 w-[50%] border border-2 focus:outline-[#720058] text-sm' value={content} onChange={(e) => setContent(e.target.value)}/>
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
            <div className=' w-full h-[200px] overflow-y-scroll bg-white rounded-t border-t border-2 border-gray-300 p-3'>
            {Object.values(commentsById).map(comment => (

                comment.postId === postId && <Comments key={comment._id} comment={comment} commentsById={commentsById} size={70} /> 
            ))}
            </div>
        </div>
    );
}

export default CommentsContainer;
