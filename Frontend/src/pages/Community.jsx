import React, { useState } from 'react'
import CommunityCase from '../components/CommunityCase'
import Footer from '../components/Footer'
import CommunityBox from '../components/CommunityBox'
import CreateCommunity from '../components/CreateCommunity'


const Community = () => {
  const [modal, setModal] = useState(false)
  return (
    <>
      <div className='w-full top-0 flex justify-center pt-[55px] mb-2'>
        <div className='h-auto w-full md:w-[85%] lg:rounded-2xl shadow-lg flex justify-between'>
          <CommunityBox />
          <div className='relative'>
            <div className='flex flex-col ml-2 sticky top-[60px]'>
              <CommunityCase />
              <div className='hidden lg:flex flex-col items-center bg-white p-3 rounded w-[280px] h-auto text-sm font-semibold text-[#720058] shadow-lg mt-3'>
                <p>Start a community</p>
                <div className='h-[0.5px] border border-b w-full'></div>
                <button onClick={() => setModal(true)} className='text-sm font-semibold flex mt-4 hover:bg-gray-100 text-[#004272]'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  Create one
                </button>
              </div>
            </div>
          </div>

        </div>
        {modal && <CreateCommunity setModal={setModal} />}
      </div>
      <div className="fixed bottom-20 right-0 m-4 lg:hidden">
        <button onClick={() => setModal(true)} className=''>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-9 h-9 rounded-full hover:bg-gray-100 text-[#004272] bg-white">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </button>
      </div>
      <Footer />
    </>
  )
}

export default Community
