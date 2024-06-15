import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import CommunityOverview from './CommunityOverview';

const CommunityCase = () => {
  const { communities } = useSelector(state => state.community);
  const [modal, setModal] = useState(false)
  const [community, setCommunity] = useState({})

  const handleOverview = (community) => {
    setCommunity(community)
    setModal(true)
  }

  return (
    <div className='hidden lg:flex flex-col bg-white p-3 rounded w-[280px] h-[250px] text-sm text-[#720058] shadow-lg sticky top-[60px] '>
      <p className="font-bold mb-2">Communities (Recommended)</p>
      <div className='h-[0.5px] border border-b w-full'></div>
      <div className={`mt-4 ${communities.length > 3 ? "scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 overflow-y-scroll" : ""} h-full`}>
        {communities.length > 0 ? (
          communities.map((community) => (
            <div onClick={() => handleOverview(community)} key={community._id} className="flex items-center justify-between mb-4 last:mb-0 hover:bg-gray-100 hover:cursor-pointer border-b">
              <div className="flex items-center">
                <img src={community.profile_url ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL0sjQoYo1rZf1oYqSaRE9Q8Itv7fbij4aXRgoeAQFhw&s"} alt="Community Profile" className="w-10 h-10 object-cover rounded-full mr-4" />
                <div className='flex flex-col'>
                  <span className="font-semibold hover:underline">{community.name ?? "No_name"}</span>
                  <small className="text-gray-500">Members: {community.members.length}</small>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-500">Public</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No communities found.</p>
        )}
      </div>
      {modal && <CommunityOverview setModal={setModal} community={community} />}
    </div>
  );
};

export default CommunityCase;
