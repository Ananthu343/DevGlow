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
      <div className='w-full max-w-7xl mx-auto pt-[85px] px-4 pb-20 lg:pb-8 flex justify-center gap-6'>
        <Suspense fallback={<Loader />}>
          <LeaderboardContainer />
        </Suspense>
        <div className='hidden lg:flex flex-col gap-6 sticky top-[85px] h-fit'>
          <NotificationCase />
          <SuggestionsCase />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Leaderboard
