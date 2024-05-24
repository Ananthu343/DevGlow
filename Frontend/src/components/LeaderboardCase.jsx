import React,{useEffect} from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import { getRankings } from '../slices/leaderboardSlice'
import UserCard from './UserCard'

const LeaderboardCase = () => {
  const { users } = useSelector(state => state.post)
    const { rankings } = useSelector(state => state.leaderboard)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRankings())
    }, [dispatch])
  return (
    <div className='hidden lg:flex  flex-col bg-white p-3 rounded w-[280px] h-[250px] text-sm text-[#720058] shadow-lg mb-2'>
      <p className="font-bold mb-2">Leaderboard</p>
      <div className='h-[0.5px] border border-b w-full'></div>
      <div className="mt-4 overflow-y-scroll h-full">
      {rankings?.length > 0 ?
                    <ul>
                        {rankings?.map((ranking) => {
                            const user = users?.find(ele => ele._id === ranking._id);
                            return user?.username && (
                              <li key={ranking._id}>
                                <UserCard user={user} />
                            </li>
                            )
                        })}
                    </ul>

                    : (
                        <div className='w-full flex justify-center h-full items-center'>
                            <h1 className='font-semibold'>empty !</h1>
                        </div>
                    )}
      </div>
    </div>
  )
}

export default LeaderboardCase
