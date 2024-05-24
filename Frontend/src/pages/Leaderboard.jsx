import React from 'react'
import SuggestionsCase from '../components/SuggestionsCase'
import NotificationCase from '../components/NotificationCase'
import LeaderboardContainer from '../components/LeaderboardContainer'
import Footer from '../components/Footer'

const Leaderboard = () => {
  return (
    <>
    <div className='w-full lg:w-[85%]  pt-[60px] flex justify-center  top-0 mx-auto'>
      <LeaderboardContainer/>
      <div className=' hidden lg:flex flex-col h-[520px] justify-between sticky top-[60px] z-[-1]'>
        <NotificationCase />
        <SuggestionsCase />
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Leaderboard
