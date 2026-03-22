import React from 'react'
import { useSelector } from 'react-redux'

const LeaderboardCase = () => {
  const { users } = useSelector(state => state.post)
  const { rankings } = useSelector(state => state.leaderboard)

  return (
    <div className='hidden lg:flex flex-col bg-white p-5 rounded-2xl w-[280px] max-h-[350px] text-sm text-slate-800 shadow-soft border border-slate-100'>
      <p className="font-bold text-slate-900 mb-2">Leaderboard</p>
      <hr className='border-slate-100 w-full mb-2'/>
      <div className="mt-4 custom-scrollbar overflow-y-scroll h-full">
        {rankings?.length > 0 ?
          <ul>
            {rankings?.map((ranking, index) => {
              const user = users?.find(ele => ele._id === ranking._id);
              return user?.username && (
                <li key={ranking._id} className="mb-2">
                  <div className={`rounded-xl overflow-hidden shadow-sm ${index + 1 === 1 ? "bg-gradient-to-r from-amber-100 to-amber-50 text-amber-900 border border-amber-200" : index + 1 === 2 ? "bg-gradient-to-r from-slate-100 to-slate-50 text-slate-800 border border-slate-200" : index + 1 === 3 ? "bg-gradient-to-r from-orange-100 to-orange-50 text-orange-900 border border-orange-200" : "bg-white border border-slate-100 text-slate-700"} relative`}>
                    <div className='cursor-pointer flex p-2 w-full items-center '>
                      {user?.profile_url ? (
                        <div className='border-2 border-white rounded-full overflow-hidden mr-3 shadow-sm'>
                          <img className='w-[36px] h-[36px] object-cover' src={user?.profile_url} alt="profilepic" />
                        </div>
                      ) : (
                        <img className='border-2 border-white shadow-sm w-[36px] h-[36px] rounded-full mr-3 hidden lg:flex object-cover'
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSinUiRqVB94sfZZbtNZgPJswUTs4R7YDskvXfVjUSejKfQqAoMaedQBNfybdIdduiix4&usqp=CAU"
                          alt="profile pic" />
                      )}

                      <h2 className="text-sm font-semibold hover:opacity-80">{user?.username}</h2>
                    </div>
                  </div>
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
