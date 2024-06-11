import React, { useEffect } from 'react'
import CommunityCase from '../components/CommunityCase'
import NotificationCase from '../components/NotificationCase'
import LeaderboardCase from '../components/LeaderboardCase'
import Feeds from '../components/Feeds'
import { useDispatch } from 'react-redux'
import { getFeed,getComments, clearFeed } from '../slices/postSlice'


const Home = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
      dispatch(getFeed())
    return ()=> dispatch(clearFeed())
  }, [dispatch])

  return (
    <div className='w-[85%] pt-[60px] flex justify-center  top-0 mx-auto'>
      <CommunityCase />
      <Feeds />
      <div className=' hidden lg:flex flex-col h-[520px] justify-between sticky top-[60px]'>
        <NotificationCase />
        <LeaderboardCase />
      </div>
    </div>
  )
}

export default Home
