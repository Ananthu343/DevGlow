import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getRankings,setRanking } from '../slices/leaderboardSlice'
import UserCard from './UserCard'

const LeaderboardContainer = () => {
    const { users } = useSelector(state => state.post)
    const { rankings } = useSelector(state => state.leaderboard)
    const {userInfo} = useSelector(state => state.auth)
    const [myRank,setMyRank] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRankings()).then((action)=>{
            const data = action.payload.filter(element => {
                const user = users?.find(ele => ele._id === element._id);
                if (user?.username) {
                    return element
                }
            });
            dispatch(setRanking(data))
        })
        rankings.forEach((element,index) => {
            if (element._id === userInfo.devGlowAccess._id) {
                setMyRank({rank:index,stars:element.size})
            }
        });
    }, [dispatch])

    return (
        <div className='h-[auto] w-full lg:w-[75%] bg-white mr-2 rounded-lg p-3 bg-customLeaderBoard-bg mb-2 flex flex-col items-center justify-center p-4'>
            <h1 className='text-white font-semibold  mb-2'>Rankings (International)</h1>
            <div className='w-full bg-white  border-2 border-[#720058] rounded mb-2'>
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
                           <tr className={`${myRank.rank + 1 === 1? "bg-[#FFD700]" : myRank.rank + 1 === 2? "bg-[#C0C0C0]" : myRank.rank + 1 === 3? "bg-[#CD7F32]" : ""} border-2 border-white`}
>
                                        
                                        <td className="px-6 py-4 whitespace-nowrap" >{myRank?.rank + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {myRank && <UserCard user={userInfo?.devGlowAccess} />}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{myRank.stars}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{userInfo?.devGlowAccess?.badge?? "Beginner"}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{new Date(userInfo?.devGlowAccess?.createdAt).toLocaleDateString()?? "Not exist"}</td>
                            </tr>
                            {rankings?.map((ranking, index) => {
                                const user = users?.find(ele => ele._id === ranking._id);
                                return user?.username && (
                                    <tr key={index} className={index + 1 === 1 ? "bg-[#FFD700] mb-2" : index + 1 === 2 ? "bg-[#C0C0C0]" : index + 1 === 3 ? "bg-[#CD7F32]" : ""}>
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
