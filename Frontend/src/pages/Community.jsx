import React from 'react'
import CommunityCase from '../components/CommunityCase' 
import Footer from '../components/Footer'

const Community = () => {
  return (
    <>
    <div className='w-full top-0 flex justify-center pt-[55px] mb-2'>
      <div className='h-auto w-full md:w-[85%] lg:rounded-2xl shadow-lg flex justify-between'>
        {/* comunitybox */}
            <div className='flex flex-col ml-2'>
                  <CommunityCase/>
                 {/* Community create */}
            </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Community
