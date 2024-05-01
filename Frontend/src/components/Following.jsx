import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import UserCard from './UserCard';

const Following = ({ user }) => {
    const [searchValue, setSearchValue] = useState('');
    const [following, setFollowing] = useState([]);
    const { users } = useSelector(state => state.post);

    useEffect(() => {
        const data = users.filter(ele => user.following.includes(ele._id));
        setFollowing(data);
    }, [users, user.following]); 

    const filteredUsers = useMemo(() => {
        if (searchValue !== '') {
            return following.filter(user => user.username.toLowerCase().includes(searchValue.toLowerCase()));
        } else {
            return following;
        }
    }, [searchValue, following]);

    return (
        <div className='flex flex-col w-[40%] pl-2 pr-2 pt-2 bg-white ml-2 mr-2'>
            <div className='flex justify-start p-3 border-b'>
                <input
                    className='border pl-1 text-sm rounded-full w-[50%] h-7 focus:outline-[#720058]'
                    type="text"
                    placeholder="Search followings..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </div>
            {following.length > 0 ? (
                filteredUsers.length ? (
                    <ul>
                        {filteredUsers.map((user) => (
                            <li key={user._id}>
                                <UserCard user={user}/>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className='w-full flex justify-center h-full items-center'>
                        <h1 className='font-semibold'>No results found!</h1>
                    </div>
                )
            ) : (
                <div className='w-full flex justify-center h-full items-center'>
                        <h1 className='font-semibold'>empty !</h1>
                </div>
            )}
        </div>
    );
};

export default Following;
