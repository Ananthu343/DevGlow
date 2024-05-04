import React, { useEffect } from 'react'
import CommunityCase from '../components/CommunityCase'
import NotificationCase from '../components/NotificationCase'
import LeaderboardCase from '../components/LeaderboardCase'
import Feeds from '../components/Feeds'
import { useDispatch,useSelector } from 'react-redux'
import { getFeed, getUsers } from '../slices/postSlice'


const Home = () => {
  const {page} = useSelector(state => state.post)
  const dispatch = useDispatch()
  
  useEffect(() => {
    // if (page === 1) {
      dispatch(getFeed())
    // }
    dispatch(getUsers())
  }, [dispatch])

  return (
    <div className='w-[85%] pt-[60px] flex justify-center  top-0 mx-auto'>
      <CommunityCase />
      <Feeds />
      <div className=' hidden lg:flex flex-col h-[510px] justify-between sticky top-[60px]'>
        <NotificationCase />
        <LeaderboardCase />
      </div>
    </div>
  )
}

export default Home
