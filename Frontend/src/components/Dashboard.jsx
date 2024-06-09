import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getDashboardData } from '../slices/adminSlice'
import PostGraph from './PostGraph'
import MessageGraph from './MessageGraph'
import UserGraph from './UserGraph'
import CommunityGraph from './CommunityGraph'

const Dashboard = () => {
    const dispatch = useDispatch()
    const [filter,setFilter] = useState("day")
    
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };
    
    useEffect(() => {
        dispatch(getDashboardData(filter))
    }, [filter,handleFilterChange])

    return (
      <div className='flex flex-col w-full'>
        <div className='flex justify-between w-[100%] pl-3 pr-3 border-b pb-3'>
          <div className='w-[30%] flex justify-between'>
            <h1 className='font-semibold text-[#720058]'>Dashboard</h1>
           <div className='flex'>
           <p>filter:</p>
            <select className=' text-white bg-[#004272] rounded' value={filter} onChange={handleFilterChange}>
              <option value="day">Day</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>
           </div>
          </div>
        </div>
        <div className='flex w-full'>
          <PostGraph/>
          <MessageGraph/>
        </div>
        <div className='flex w-full'>
          <CommunityGraph/>
          <UserGraph/>
        </div>
      </div>
    )
}

export default Dashboard
