import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getFeed } from '../slices/postSlice';
import VideoPlayer from './VideoPlayer'
import EditPost from './EditPost';
import DropdownMenu from './DropdownMenu';
import FollowToggle from './FollowToggle';
import LikeToggle from './LikeToggle';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ScaleLoader } from 'react-spinners'
import CommentsContainer from './CommentsContainer';
import Share from './Share';
import { useNavigate } from 'react-router-dom';

const Feeds = () => {
  const { feed, users, page, hasMore, commentsById } = useSelector(state => state.post);
  const { userInfo } = useSelector(state => state.auth);
  const { badges } = useSelector(state => state.leaderboard);
  const [readMoreStates, setReadMoreStates] = useState({});
  const [modal, setModal] = useState(false)
  const [editPost, setEditPost] = useState(null)
  const [openComments, setOpenComments] = useState({});
  const [openShare, setOpenShare] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const toggleComments = (postId) => {
    setOpenComments(prevState => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  const toggleReadMore = (index) => {
    setReadMoreStates(prevStates => ({
      ...prevStates,
      [index]: !prevStates[index],
    }));
  };

  const openEdit = (post) => {
    setEditPost(post)
    setModal(true)
  }

  const fetchData = () => {
    dispatch(getFeed(page))
  }

  return (
    <div className='w-full md:w-[550px] h-auto flex-col md:pl-4 md:pr-4'>
      <InfiniteScroll
        dataLength={feed.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<div className='w-full flex justify-center'><ScaleLoader color="#3688d6" /></div>}
        endMessage={
          <p style={{ textAlign: 'center', color: 'purple' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >

        {feed?.map((document, index) => {
          const userData = users?.find(user => user._id === document?.creatorId);
          const badgeData = badges.find(badge => badge?._id === userData?.badge)
          if (!userInfo?.devGlowAccess?.blocked.includes(userData?._id)) {
            if (document.archive === false || undefined) {
              const isReadMore = readMoreStates[index] || false;
              let commentCount = 0;
              Object.keys(commentsById).forEach(key => {
                const value = commentsById[key];
                if (value.postId === document._id) {
                  commentCount++
                }
              });

              let visibility = true;
              switch (document?.visibility) {
                case "Me only":
                  visibility = document?.creatorId === userInfo?.devGlowAccess._id
                  break;
                  
                case "Followers":
                  if (document?.creatorId === userInfo?.devGlowAccess._id) {
                    visibility = true
                  }else{
                    visibility = !userData?.followers.includes(userInfo?.devGlowAccess._id) ? false : true;
                  }
                  break;
                default : 
                  visibility = true;
                  break;
              }

              return visibility &&  (
                <div key={index}>
                  <div className='bg-white rounded shadow-lg pt-2 pb-2'>
                    <div className='w-full h-10 p-3 flex justify-between items-center'>
                      <div className='flex w-auto h-auto justify-between items-center '>
                        <div className='border border-[#720058] rounded-full overflow-hidden mr-2'>
                          <img className='w-[40px] h-[40px] object-cover' src={userData?.profile_url ? userData?.profile_url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSinUiRqVB94sfZZbtNZgPJswUTs4R7YDskvXfVjUSejKfQqAoMaedQBNfybdIdduiix4&usqp=CAU"} alt="profilepic" />
                        </div>
                        <div className='flex flex-col'>
                          <h1 onClick={() => navigate(`/userProfile/${userData._id}`)} className='text-sm font-semibold hover:text-blue-800 hover:underline hover:cursor-pointer'>{userData ? userData.username : 'Unknown'}</h1>
                          <p className='text-[9px] text-[#979797]'>{badgeData?.badge_name ? badgeData?.badge_name : 'Beginner'}</p>
                          <p className='text-[8px] text-[#979797]'>Posted on: {new Date(document.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className='flex '>
                        <FollowToggle userData={userData} />
                        {userInfo?.devGlowAccess._id === userData?._id ? <DropdownMenu options={["Edit Post"]} document={document} openEdit={openEdit} /> : <DropdownMenu options={["Save Post", "Report User", "Block User", "Report Post"]} document={document} />}
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
                      <p className='flex items-center'><img className='w-4' src="star.webp" alt="" />{document.likedUsers?.length}</p>
                      <p>{commentCount} comments</p>
                    </div>
                    <div className='border-t w-full flex justify-around pl-3 pr-3 text-[12px]'>
                      <LikeToggle document={document} />
                      <p onClick={() => toggleComments(document._id)} className='flex items-center cursor-pointer p-2 hover:bg-gray-100 hover:text-blue-600'><img className='w-5 mr-1' src="comment.png" alt="" />Comment</p>
                      <p onClick={() => setOpenShare(true)} className='flex items-center cursor-pointer p-2 hover:bg-gray-100 hover:text-blue-600'><img className='w-3 mr-1' src="share.png" alt="" />Share</p>
                    </div>
                  </div>
                  {openComments[document._id] ? <CommentsContainer postId={document._id} /> : null}
                  <div className='mt-3 mb-3 h-[1px] bg-[#004272] rounded' />
                </div>
              );
            } else {
              return null
            }
          } else {
            return null
          }
        })}
        {modal ?
          <EditPost post={editPost} setModal={setModal} />
          : null}
        {openShare ?
          <Share post={document._id} setOpenShare={setOpenShare} />
          : null}
      </InfiniteScroll>
    </div>
  );
}

export default React.memo(Feeds)
