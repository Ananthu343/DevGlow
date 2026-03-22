import React, { useState } from 'react'
import CommunityCase from '../components/CommunityCase'
import Footer from '../components/Footer'
import CommunityBox from '../components/CommunityBox'
import CreateCommunity from '../components/CreateCommunity'


const Community = () => {
  const [modal, setModal] = useState(false)

  return (
    <>
      <div className='w-full top-0 flex justify-center pt-[85px] mb-8 px-4'>
        <div className='h-auto w-full max-w-7xl flex gap-6'>
          <div className='w-full lg:w-[calc(100%-324px)] bg-white rounded-2xl shadow-soft border border-slate-100 overflow-hidden flex'>
            <CommunityBox />
          </div>
          <div className='hidden lg:flex flex-col w-[300px] shrink-0 gap-6 sticky top-[85px] h-fit'>
            <CommunityCase />
            <div className='flex flex-col items-center bg-white p-5 rounded-2xl w-full text-sm font-semibold text-slate-800 shadow-soft border border-slate-100'>
              <p className="text-slate-900 mb-2">Start a community</p>
              <hr className='border-slate-100 w-full mb-2'/>
              <button onClick={() => setModal(true)} className='text-sm font-medium flex items-center justify-center w-full mt-2 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 transition-colors border border-slate-200 shadow-sm'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Create one
              </button>
            </div>
          </div>
        </div>
        {modal && <CreateCommunity setModal={setModal} />}
      </div>
      <div className="fixed bottom-24 right-4 z-50 lg:hidden shadow-[0_4px_20px_-2px_rgba(0,0,0,0.15)] rounded-full">
        <button onClick={() => setModal(true)} className='bg-slate-900 border border-slate-700 text-white rounded-full p-3 hover:bg-slate-800 transition-colors'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>
      <Footer />
    </>
  )
}

export default Community
