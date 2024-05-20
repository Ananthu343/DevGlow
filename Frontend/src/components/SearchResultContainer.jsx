import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const SearchResultContainer = ({ value }) => {
    const { users } = useSelector(state => state.post);
    const [userBox,setUserBox] = useState(true)
    const [communityBox,setCommunityBox] = useState(false)
    console.log(value);

    const filteredUsers = users.filter(user => user.username.toLowerCase().includes(value.toLowerCase()));
    const filteredCommunities = [];
    
    const handleCommunityBox = ()=>{
        setUserBox(false)
        setCommunityBox(true)
    }
    const handleUserBox = ()=>{
        setUserBox(true)
        setCommunityBox(false)
    }

    return (
        <div className='w-full md:w-[550px] h-[500px] flex-col md:pl-2 md:pr-2'>
            <div className='w-full bg-white h-full p-4 rounded'>
                <h1 className='font-semibold text-[#720058]'>Search page</h1>
                <div className='w-full flex border-b mt-2 mb-2'>
                    <button onClick={handleUserBox} className={userBox ? `shadow-lg border mr-2 pl-3 pr-3 pt-2 pb-2 text-[12px] font-semibold text-[#720058]`:` border mr-2 pl-3 pr-3 pt-2 pb-2 text-[12px] font-semibold text-[#720058]`}>Users</button>
                    <button onClick={handleCommunityBox} className={communityBox ? `shadow-lg border mr-2 pl-3 pr-3 pt-2 pb-2 text-[12px] font-semibold text-[#720058]`:` border mr-2 pl-3 pr-3 pt-2 pb-2 text-[12px] font-semibold text-[#720058]`}>Community</button>
                </div>
                <div>
                    {userBox && filteredUsers.map((user, index) => (
                        <div className='flex items-center border-b p-2 cursor-pointer' key={index}>
                        <img className='border border-[#720058] w-7 rounded-full mr-2' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSinUiRqVB94sfZZbtNZgPJswUTs4R7YDskvXfVjUSejKfQqAoMaedQBNfybdIdduiix4&usqp=CAU" alt="profile pic" />
                        <p className='text-black'>{user.username}</p>
                    </div>
                    ))}
                    {communityBox && filteredCommunities.map((community, index) => (
                        <div className='flex items-center border-b p-2 cursor-pointer' key={index}>
                        <img className='border border-[#720058] w-7 rounded-full mr-2' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSinUiRqVB94sfZZbtNZgPJswUTs4R7YDskvXfVjUSejKfQqAoMaedQBNfybdIdduiix4&usqp=CAU" alt="profile pic" />
                        <p className='text-black'>community</p>
                        <h1>no results</h1>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchResultContainer;

