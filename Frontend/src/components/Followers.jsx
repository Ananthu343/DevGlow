import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import UserCard from './UserCard';
import PropTypes from 'prop-types'

const Followers = ({user}) => {
    const [searchValue, setSearchValue] = useState('');
    const [followers, setFollowers] = useState([]);
    const { users } = useSelector(state => state.post);

    useEffect(() => {
        const data = users.filter(ele => user.followers.includes(ele._id));
        setFollowers(data);
    }, [users, user.followers]); 

    const filteredUsers = useMemo(() => {
        if (searchValue !== '') {
            return followers.filter(user => user.username.toLowerCase().includes(searchValue.toLowerCase()));
        } else {
            return followers;
        }
    }, [searchValue, followers]);

    return (
        <div className='flex flex-col w-[40%] pl-2 pr-2 pt-2 bg-white ml-2 mr-2'>
            <div className='flex justify-start p-3 border-b'>
                <input
                    className='border pl-1 text-sm rounded-full w-[50%] h-7 focus:outline-[#720058]'
                    type="text"
                    placeholder="Search followers"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </div>
            {followers.length > 0 ? (
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
}

Followers.propTypes = {
    user: PropTypes.object.isRequired, 
  };

export default Followers
