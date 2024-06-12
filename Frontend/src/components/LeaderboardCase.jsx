import React from 'react'
import { useSelector  } from 'react-redux'

const LeaderboardCase = () => {
  const { users } = useSelector(state => state.post)
  const { rankings } = useSelector(state => state.leaderboard)

  return (
    <div className='hidden lg:flex  flex-col bg-white p-3 rounded w-[280px] h-[250px] text-sm text-[#720058] shadow-lg mb-2'>
      <p className="font-bold mb-2">Leaderboard</p>
      <div className='h-[0.5px] border border-b w-full'></div>
      <div className="mt-4 overflow-y-scroll h-full">
        {rankings?.length > 0 ?
          <ul>
            {rankings?.map((ranking,index) => {
              const user = users?.find(ele => ele._id === ranking._id);
              return user?.username && (
                <li key={ranking._id}>
                  <div className={`${index + 1 === 1? "bg-customLeaderBoardgold-bg text-white" : index + 1 === 2? "bg-customLeaderBoardsilver-bg text-white" : index + 1 === 3? "bg-customLeaderBoardbronze-bg text-white" : ""} border-2 border-white relative`}>
                    <div className='cursor-pointer flex p-2 w-full border-b items-center '>
                      {user?.profile_url ? (
                        <div className='border border-[#720058] rounded-full overflow-hidden mr-2'>
                          <img className='w-[40px] h-[40px] object-cover' src={user?.profile_url} alt="profilepic" />
                        </div>
                      ) : (
                        <img className='border border-[#720058] w-[40px] h-[40px] rounded-full mr-2 hidden lg:flex'
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSinUiRqVB94sfZZbtNZgPJswUTs4R7YDskvXfVjUSejKfQqAoMaedQBNfybdIdduiix4&usqp=CAU"
                          alt="profile pic" />
                      )}

                      <h2 className="text-sm font-semibold hover:underline">{user?.username}</h2>
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
