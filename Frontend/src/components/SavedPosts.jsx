import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import PostDropdown from './PostDropdown'

import VideoPlayer from './VideoPlayer'
import FollowToggle from './FollowToggle'

const SavedPosts = () => {
    const { savedPosts, users } = useSelector(state => state.post);
    const { userInfo } = useSelector(state => state.auth);
    const [readMoreStates, setReadMoreStates] = useState({});
      
   const toggleReadMore = (index) => {
      setReadMoreStates(prevStates => ({
        ...prevStates,
        [index]: !prevStates[index],
      }));
   };
   
   const reversedPosts = [...savedPosts].reverse();
   
    return (
      <div className='w-full md:w-[550px] h-auto flex-col md:pl-4 md:pr-4'>
        {reversedPosts?.map((document, index) => {
          const userData = users.find(user => user._id === document.creatorId);
  
          const isReadMore = readMoreStates[index] || false;
          
          return (
            <div key={index}>
              <div className='bg-white rounded shadow-lg pt-2 pb-2'>
                <div className='w-full h-10 p-3 flex justify-between items-center'>
                  <div className='flex w-auto h-10 justify-between items-center '>
                    <img className='border border-[#720058] w-8 rounded-full mr-2 ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSinUiRqVB94sfZZbtNZgPJswUTs4R7YDskvXfVjUSejKfQqAoMaedQBNfybdIdduiix4&usqp=CAU" alt="profilepic" />
                    <div className='flex flex-col'>
                      <h1 className='text-sm font-semibold hover:text-blue-800 hover:underline hover:cursor-pointer'>{userData ? userData.username : 'Unknown'}</h1>
                      <p className='text-[9px] text-[#979797]'>{userData?.about ? userData.about : 'Aboutscccccccccccclccccclcddddddccscscs'}</p>
                      <p className='text-[8px] text-[#979797]'>Posted on: {new Date(document.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className='flex'>
                  <FollowToggle userData={userData}/>
                  
                  {userInfo?.devGlowAccess._id === userData?._id ? <PostDropdown options={["Edit Post"]} document={document} /> : <PostDropdown options={["Save Post", "Report User"]} document={document}/>}
                 </div>
                </div>
                <div className='border-t w-full h-auto mt-2 mb-2 pl-3 pr-3 break-words'>
                <p className='text-sm'>
                   {isReadMore ? document.description : document.description.slice(0, 50)}
                   {document.description.length > 50 ? <span onClick={() => toggleReadMore(index)} className="read-or-hide text-black text-xs cursor-pointer">
                      {isReadMore ? "..show less" : " ..read more"}
                   </span> : null}
                  </p>
                </div>
                {
                  document.media ? document.media.includes("mp4") ? <VideoPlayer videoUrl={document.media} /> : <img src={document.media} alt="media" className='w-full' />
                    : null
                }
                <div className='mt-1 w-full flex justify-between pl-2 pr-2 text-[11px] text-[#979797]'>
                     <p className='flex items-center'><img className='w-4' src="star.webp" alt="" />{document.stars}</p>
                     <p>0 comments</p>
                </div>
                <div className='border-t w-full flex justify-around pl-3 pr-3 text-[12px]'>
                     <p className='flex items-center cursor-pointer'><img className='w-5 mr-1' src="star.webp" alt="" />Like</p>
                     <p className='flex items-center cursor-pointer'><img className='w-5 mr-1' src="comment.png" alt="" />Comment</p>
                     <p className='flex items-center cursor-pointer'><img className='w-3 mr-1' src="share.png" alt="" />Share</p>
                </div>
              </div>
              <div className='mt-3 mb-3 h-[1px] bg-[#004272] rounded' />
            </div>
          );
        })}
      </div>
    );
}

export default SavedPosts
