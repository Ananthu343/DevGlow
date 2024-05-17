import React from 'react'
import Footer from '../components/Footer'
import LeaderboardCase from '../components/LeaderboardCase'
import SuggestionsCase from '../components/SuggestionsCase'
import ChatBox from '../components/ChatBox'

const Messages = () => {
  return (
    <>
    <div className='w-full top-0 flex justify-center pt-[55px] mb-2'>
      <div className='h-auto w-full md:w-[85%] lg:rounded-2xl shadow-lg flex justify-between'>
            <ChatBox/>
            <div className='flex flex-col ml-2'>
                  <LeaderboardCase/>
                  <SuggestionsCase/>
            </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Messages
