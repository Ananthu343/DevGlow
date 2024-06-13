import React from 'react'
import { useParams } from 'react-router-dom'
import LeaderboardCase from '../components/LeaderboardCase'
import NotificationCase from '../components/NotificationCase'
import SearchResultContainer from '../components/SearchResultContainer'

const Search = () => {
  const { value } = useParams()
  return (
    <div className=' w-[85%] pt-[60px] flex justify-center  top-0 mx-auto'>
      <NotificationCase />
      <SearchResultContainer value={value} />
      <LeaderboardCase />
    </div>
  )
}

export default Search

