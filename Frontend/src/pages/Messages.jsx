import React from 'react'
import Footer from '../components/Footer'
import LeaderboardCase from '../components/LeaderboardCase'
import SuggestionsCase from '../components/SuggestionsCase'
import ChatBox from '../components/ChatBox'

const Messages = () => {
  return (
    <>
      <div className='w-full top-0 flex justify-center pt-[85px] mb-8 px-4'>
        <div className='h-auto w-full max-w-7xl flex gap-6'>
          <div className='w-full lg:w-[calc(100%-324px)] bg-white rounded-2xl shadow-soft border border-slate-100 overflow-hidden flex'>
            <ChatBox />
          </div>
          <div className='hidden lg:flex flex-col w-[300px] shrink-0 gap-6 sticky top-[85px] h-fit'>
            <LeaderboardCase />
            <SuggestionsCase />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Messages
