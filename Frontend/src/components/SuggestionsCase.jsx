import React from 'react'
import { useSelector } from 'react-redux'
import UserCard from './UserCard'

const SuggestionsCase = () => {
    const { users } = useSelector(state => state.post)

    return (
        <div className='hidden lg:flex flex-col bg-white p-3 rounded w-[280px] h-[250px] text-sm text-[#720058] shadow-lg sticky top-[60px] mb-2'>
            <p>Suggestions</p>
            <div className='h-[0.5px] border border-b w-full '></div>
            <div className="mt-4 custom-scrollbar overflow-y-scroll h-full">
                {users?.length > 0 ?
                    <ul>
                        {users?.map((user) => (
                            <li key={user._id} >
                                <UserCard user={user} />
                            </li>
                        ))}
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

export default SuggestionsCase
