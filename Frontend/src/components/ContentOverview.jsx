import React ,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import FollowToggle from './FollowToggle';
import LikeToggle from './LikeToggle';
import DropdownMenu from './DropdownMenu';
import VideoPlayer from './VideoPlayer';
import CommentsContainer from './CommentsContainer';
import Share from './Share';
import EditPost from './EditPost';

const ContentOverview = ({setModal , data}) => {
    const { commentsById } = useSelector( state => state.post)
    const { userInfo } = useSelector( state => state.auth)
    const document = data.content;
    const userData = data.creator;
  const [commentCount,setCommentCount] = useState(0)
  const [isReadMore, setIsReadMore] = useState(false);
  const [edit, openEdit] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const [openShare, setOpenShare] = useState(false)

  useEffect(()=>{
    let commentCount = 0;
    Object.keys(commentsById).forEach(key => {
      const value = commentsById[key];
      if (value.postId === document._id) {
        commentCount++
      }
    });
    setCommentCount(commentCount)
  },[commentsById])

    
  const toggleComments = () => {
    setOpenComments(!openComments);
  };

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore)
  };


  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
    <div className='absolute w-screen h-full bg-black/60 flex justify-center items-center z-[100] top-0'>
        <div className='bg-white rounded-[10px] w-[600px] h-[600px] p-3 flex flex-col justify-center text-[#720058] text-sm '>
            <div className='w-full flex justify-end'>
              <button onClick={() => setModal(false)}><img className='w-7' src="close.jpg" alt="close" /></button>
            </div>
            <div className='h-full w-full overflow-y-scroll pt-2'>
            <div className='bg-white rounded shadow-lg'>
                <div className='w-full h-10 p-3 flex justify-between items-center'>
                  <div className='flex w-auto h-auto justify-between items-center '>
                    <div className='border border-[#720058] rounded-full overflow-hidden mr-2'>
                      <img className='w-[40px] h-[40px] object-cover' src={userData?.profile_url ? userData?.profile_url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSinUiRqVB94sfZZbtNZgPJswUTs4R7YDskvXfVjUSejKfQqAoMaedQBNfybdIdduiix4&usqp=CAU"} alt="profilepic" />
                    </div>
                    <div className='flex flex-col'>
                      <h1 className='text-sm font-semibold hover:text-blue-800 hover:underline hover:cursor-pointer'>{userData ? userData.username : 'Unknown'}</h1>
                      <p className='text-[9px] text-[#979797]'>{userData?.badge ? userData.badge : 'Beginner'}</p>
                      <p className='text-[8px] text-[#979797]'>Posted on: {new Date(document.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className='flex '>
                    <FollowToggle userData={userData} />
                    {userInfo?.devGlowAccess._id === userData?._id ? <DropdownMenu options={["Edit Post"]} document={document} openEdit={openEdit} /> : <DropdownMenu options={["Save Post", "Report User", "Block User"]} document={document} />}
                  </div>
                </div>
                <div className='border-t w-full h-auto mt-2 mb-2 pl-3 pr-3 break-words'>
                  <p className='text-sm'>
                    {isReadMore ? document.description : document.description.slice(0, 50)}
                    {document.description.length > 50 ? <span onClick={() => toggleReadMore()} className="read-or-hide text-black text-xs cursor-pointer">
                      {isReadMore ? "..show less" : " ..read more"}
                    </span> : null}
                  </p>
                </div>
                {
                  document.media ? document.media.includes("mp4") ? <VideoPlayer videoUrl={document.media} /> : <img src={document.media} alt="media" className='w-full' />
                    : null
                }
                <div className='mt-1 w-full flex justify-between pl-2 pr-2 text-[11px] text-[#979797]'>
                  <p className='flex items-center'><img className='w-4' src="star.webp" alt="" />{document.likedUsers?.length}</p>
                  <p>{commentCount} comments</p>
                </div>
                <div className='border-t w-full flex justify-around pl-3 pr-3 text-[12px]'>
                  <LikeToggle document={document} />
                  <p onClick={() => toggleComments()} className='flex items-center cursor-pointer p-2 hover:bg-gray-100 hover:text-blue-600'><img className='w-5 mr-1' src="comment.png" alt="" />Comment</p>
                  <p onClick={() => setOpenShare(true)} className='flex items-center cursor-pointer p-2 hover:bg-gray-100 hover:text-blue-600'><img className='w-3 mr-1' src="share.png" alt="" />Share</p>
                </div>
                {openComments ? <CommentsContainer postId={document._id} /> : null}
              </div>
            </div>
        </div>
        {edit && <EditPost setModal={openEdit} post={document}/>}
        {openShare && <Share/>}
    </div>
</div>
  )
}

export default ContentOverview
