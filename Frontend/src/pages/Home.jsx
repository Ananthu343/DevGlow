import React, { useEffect } from 'react'
import CommunityCase from '../components/CommunityCase'
import NotificationCase from '../components/NotificationCase'
import LeaderboardCase from '../components/LeaderboardCase'
import Feeds from '../components/Feeds'
import { useDispatch } from 'react-redux'
import { getFeed, clearFeed } from '../slices/postSlice'


const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFeed())
    return () => dispatch(clearFeed())
  }, [dispatch])

  return (
    <div className='min-h-screen bg-slate-50'>
      <div className="absolute top-[0%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/40 rounded-full blur-3xl opacity-50 pointer-events-none z-0"></div>
      <div className="absolute top-[30%] right-[-10%] w-[30%] h-[30%] bg-pink-200/40 rounded-full blur-3xl opacity-50 pointer-events-none z-0"></div>
      
      <div className='w-full max-w-7xl mx-auto pt-[85px] px-4 pb-20 lg:pb-8 flex justify-center items-start gap-6 relative z-10'>
        <aside className='hidden lg:flex flex-col gap-6 sticky top-[80px] self-start z-20'>
          <CommunityCase />
        </aside>
        
        <main className='flex-grow max-w-[600px]'>
           <Feeds />
        </main>

        <aside className='hidden lg:flex flex-col gap-6 sticky top-[80px] self-start z-20'>
          <NotificationCase />
          <LeaderboardCase />
        </aside>
      </div>
    </div>
  )
}

export default Home
