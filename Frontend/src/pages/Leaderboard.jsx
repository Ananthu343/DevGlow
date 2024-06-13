import React from 'react'
import SuggestionsCase from '../components/SuggestionsCase'
import NotificationCase from '../components/NotificationCase'
import Loader from '../components/Loader'
import Footer from '../components/Footer'
import { Suspense } from 'react'

const LeaderboardContainer = React.lazy(() => import('../components/LeaderboardContainer'))

const Leaderboard = () => {
  return (
    <>
      <div className='w-full lg:w-[85%]  pt-[60px] flex justify-center  top-0 mx-auto'>
        <Suspense fallback={<Loader />}>
          <LeaderboardContainer />
        </Suspense>
        <div className=' hidden lg:flex flex-col h-[520px] justify-between sticky top-[60px]'>
          <NotificationCase />
          <SuggestionsCase />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Leaderboard
