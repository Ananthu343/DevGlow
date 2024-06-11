import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CommunityOverview from './CommunityOverview';
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';

const SearchResultContainer = ({ value }) => {
    const { users } = useSelector(state => state.post);
    const { communities } = useSelector(state => state.community);
    const [userBox, setUserBox] = useState(true)
    const [communityBox, setCommunityBox] = useState(false)
    const [modal, setModal] = useState(false)
    const [community, setCommunity] = useState({})
    const [filteredUsers, setFilteredUsers] = useState([])
    const [filteredCommunities, setFilteredComunities] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (value === "*") {
            setFilteredComunities(communities)
            setFilteredUsers(users)
        } else {
            const searchfilteredUsers = users?.filter(user => user.username.toLowerCase().includes(value.toLowerCase()));
            const searchfilteredCommunities = communities?.filter(community => community.name.toLowerCase().includes(value.toLowerCase()));
            setFilteredUsers(searchfilteredUsers)
            setFilteredComunities(searchfilteredCommunities)
        }
    }, [communities, users, value])


    const handleCommunityBox = () => {
        setUserBox(false)
        setCommunityBox(true)
    }
    const handleUserBox = () => {
        setUserBox(true)
        setCommunityBox(false)
    }
    const handleOverview = (community) => {
        setCommunity(community)
        setModal(true)
    }

    return (
        <div className='w-full md:w-[550px] h-[500px] flex-col md:pl-2 md:pr-2'>
            <div className='w-full bg-white h-full p-4 rounded'>
                <h1 className='font-semibold text-[#720058]'>Search page</h1>
                <div className='w-full flex border-b mt-2 mb-2'>
                    <button onClick={handleUserBox} className={userBox ? `shadow-lg border mr-2 pl-3 pr-3 pt-2 pb-2 text-[12px] font-semibold text-[#720058]` : ` border mr-2 pl-3 pr-3 pt-2 pb-2 text-[12px] font-semibold text-[#720058]`}>Users</button>
                    <button onClick={handleCommunityBox} className={communityBox ? `shadow-lg border mr-2 pl-3 pr-3 pt-2 pb-2 text-[12px] font-semibold text-[#720058]` : ` border mr-2 pl-3 pr-3 pt-2 pb-2 text-[12px] font-semibold text-[#720058]`}>Community</button>
                </div>
                <div>
                    {userBox && filteredUsers?.length > 0 ?
                        <ul>
                            {filteredUsers.map((user) => (
                                <li key={user._id} className={`cursor-pointer flex flex-col w-full hover:bg-gray-100 items-center mb-2`}>
                                    <div onClick={()=> navigate(`/userProfile/${user?._id}`)} className='cursor-pointer flex p-2 w-full border-b items-center '>
                                        {user?.profile_url ? (
                                            <div className='border border-[#720058] rounded-full overflow-hidden mr-2'>
                                                <img className='w-[40px] h-[40px] object-cover' src={user?.profile_url} alt="profilepic" />
                                            </div>
                                        ) : (
                                            <img className='border border-[#720058] w-[40px] h-[40px] rounded-full mr-2 hidden lg:flex'
                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSinUiRqVB94sfZZbtNZgPJswUTs4R7YDskvXfVjUSejKfQqAoMaedQBNfybdIdduiix4&usqp=CAU"
                                                alt="profile pic" />
                                        )}

                                        <h2 className="text-sm font-semibold hover:underline">{user.username}</h2>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        : (
                            <div className='w-full flex justify-center h-full items-center'>
                                <h1 className='font-semibold'>empty !</h1>
                            </div>
                        )}
                    {communityBox ? filteredCommunities.length > 0 ? (
                        filteredCommunities.map((community) => (
                            <div onClick={() => handleOverview(community)} key={community._id} className="flex items-center justify-between mb-4 last:mb-0 hover:bg-gray-100 hover:cursor-pointer border-b">
                                <div className="flex items-center">
                                    <img src={community.profile_url ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL0sjQoYo1rZf1oYqSaRE9Q8Itv7fbij4aXRgoeAQFhw&s"} alt="Community Profile" className="w-10 h-10 object-cover rounded-full mr-4" />
                                    <div className='flex flex-col'>
                                        <span className="font-semibold hover:underline">{community.name ?? "No_name"}</span>
                                        <small className="text-gray-500">Members: {community.members.length}</small>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs text-gray-500">Public</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No communities found.</p>
                    ) : null}
                </div>
            </div>
            {modal && <CommunityOverview setModal={setModal} community={community} />}
        </div>
    );
};

SearchResultContainer.propTypes = {
    value: PropTypes.string.isRequired
  };

export default SearchResultContainer;

