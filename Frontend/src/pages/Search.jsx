import React from 'react'
import { useParams } from 'react-router-dom'
import LeaderboardCase from '../components/LeaderboardCase'
import NotificationCase from '../components/NotificationCase'
import SearchResultContainer from '../components/SearchResultContainer'

const Search = () => {
  const { value } = useParams()
  return (
    <div className="w-full max-w-7xl mx-auto pt-[85px] px-4 flex justify-center gap-6">
      <div className="hidden lg:block w-[280px] flex-shrink-0">
        <div className="sticky top-[85px]">
          <NotificationCase />
        </div>
      </div>
      
      <div className="w-full max-w-[600px] flex-grow">
        <SearchResultContainer value={value} />
      </div>

      <div className="hidden lg:block w-[280px] flex-shrink-0">
        <div className="sticky top-[85px]">
          <LeaderboardCase />
        </div>
      </div>
    </div>
  )
}

export default Search

