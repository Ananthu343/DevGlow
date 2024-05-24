import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getRankings } from '../slices/leaderboardSlice'
import UserCard from './UserCard'

const LeaderboardContainer = () => {
    const { users } = useSelector(state => state.post)
    const { rankings } = useSelector(state => state.leaderboard)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRankings())
    }, [dispatch])

    return (
        <div className='h-[auto] w-full lg:w-[75%] bg-white mr-2 rounded-lg p-3 bg-customLeaderBoard-bg mb-2 flex flex-col items-center justify-center p-4'>
            <h1 className='text-white font-semibold  mb-2'>Rankings (International)</h1>
            <div className='w-full bg-white/40  border-2 border-[#720058] rounded mb-2'>
            <div className="overflow-y-scroll  max-h-[600px]">
                    <table className="min-w-max w-full h-full divide-y divide-gray-200">
                        <thead className="bg-white/40">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stars</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Badge</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Joined</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white/40 divide-y divide-gray-200">
                            {rankings.map((ranking, index) => {
                                const user = users?.find(ele => ele._id === ranking._id);
                                console.log(user);
                                return user?.username && (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {user && <UserCard user={user} />}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{ranking.size}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{user?.badge?? "Beginner"}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{new Date(user?.createdAt).toLocaleDateString()?? "Not exist"}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='flex w-full flex-start'>
                <input type="text" />
            </div>
        </div>
    )
}

export default LeaderboardContainer
