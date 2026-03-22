import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import UserCard from './UserCard'

const LeaderboardContainer = () => {
    const { users } = useSelector(state => state.post);
    const { rankings } = useSelector(state => state.leaderboard);
    const { userInfo } = useSelector(state => state.auth);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRankings, setFilteredRankings] = useState(rankings);
    const [myRank, setMyRank] = useState({});

    useEffect(() => {
        rankings?.forEach((element, index) => {
            if (element._id === userInfo?.devGlowAccess._id) {
                setMyRank({ rank: index, stars: element.size });
            }
        });
    }, [rankings, userInfo?.devGlowAccess._id]);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredRankings(rankings);
        } else {
            const filtered = rankings.filter((ranking) => {
                const userData = users.find(ele => ele._id === ranking._id)
                return userData.username.toLowerCase().includes(searchQuery.toLowerCase())
            }
            );
            setFilteredRankings(filtered);
        }
    }, [searchQuery, rankings, users]);

    return (
        <div className='w-full max-w-[800px] bg-white rounded-2xl shadow-soft border border-slate-100 flex flex-col p-6 mb-8 overflow-hidden'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4'>
                <h1 className='text-slate-900 font-bold text-xl'>Leaderboard Rankings</h1>
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-slate-200 bg-slate-50 text-slate-800 text-sm py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-300 transition-shadow w-full md:w-[250px]"
                />
            </div>
            <div className='w-full overflow-hidden rounded-xl border border-slate-200'>
                <div className="custom-scrollbar overflow-x-auto w-full max-h-[600px] overflow-y-scroll">
                    <table className="min-w-max w-full h-full divide-y divide-slate-200">
                        <thead className="bg-slate-50 sticky top-0 z-10">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Rank</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Stars</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Badge</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date Joined</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-100 text-slate-700">
                            {myRank.rank !== undefined && (
                                <tr className={`${myRank.rank + 1 === 1 ? "bg-amber-50" : myRank.rank + 1 === 2 ? "bg-slate-100" : myRank.rank + 1 === 3 ? "bg-orange-50" : "bg-slate-50"} font-medium`}>
                                    <td className="px-6 py-4 whitespace-nowrap">{myRank.rank + 1}. (You)</td>
                                    <td className="whitespace-nowrap">
                                        <UserCard user={userInfo?.devGlowAccess} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{myRank.stars}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-xs">{userInfo?.devGlowAccess?.badge ?? "Beginner"}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(userInfo?.devGlowAccess?.createdAt).toLocaleDateString() ?? "Not exist"}</td>
                                </tr>
                            )}
                            {filteredRankings.map((ranking, index) => {
                                const user = users?.find(ele => ele._id === ranking._id);
                                return user?.username && (
                                    <tr key={index} className={`${index + 1 === 1 ? "bg-amber-50" : index + 1 === 2 ? "bg-slate-50" : index + 1 === 3 ? "bg-orange-50" : "hover:bg-slate-50 transition-colors"}`}>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900">{index + 1}</td>
                                        <td className="whitespace-nowrap">
                                            <UserCard user={user} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-slate-600">{ranking.size}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-xs">{user?.badge ?? "Beginner"}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{new Date(user?.createdAt).toLocaleDateString() ?? "Not exist"}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default LeaderboardContainer
