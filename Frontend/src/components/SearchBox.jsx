import React, { useEffect, useMemo, useState,useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CommunityOverview from './CommunityOverview';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types'

const SearchBox = ({ setSearchBox, searchTerm }) => {
    const { users } = useSelector(state => state.post);
    const { communities } = useSelector(state => state.community);
    const navigate = useNavigate()
    const [modal,setModal] = useState(false)
    const [community,setCommunity] = useState({})
    const searchTermRef = useRef();
  
    const handleOverview = (community)=>{
      setCommunity(community)
      setModal(true)
    }

    useEffect(() => {
        searchTermRef.current = searchTerm; 
        if (searchTermRef.current === "") {
            searchTermRef.current = "*"; 
        }
    }, [searchTerm])

    const filteredUsers = useMemo(() => {
        if (searchTerm !== '') {
            return users.filter(user => user.username.toLowerCase().includes(searchTerm.toLowerCase()));
        } else {
            return [];
        }
    }, [searchTerm, users]);

    const filteredCommunities = useMemo(() => {
        if (searchTerm !== '') {
            return communities.filter(community => community.name.toLowerCase().includes(searchTerm.toLowerCase()));
        } else {
            return [];
        }
    }, [searchTerm, communities]);

    const stopPropagation = (e) => {
        e.stopPropagation();
    };
    const handleSearchPage = () => {
        if (searchTerm !== '') {
            navigate(`/searchPage/${searchTerm}`)
            setSearchBox(false)
        } else {
            toast.error("Give any input")
        }

    }

    return (
        <div onClick={() => setSearchBox(false)} className='fixed w-full h-screen bg-black/50 pt-[55px] pl-[80px] block md:pl-[180px] lg:pl-[270px] z-10'>
            <div onClick={stopPropagation} className='w-[250px] h-auto bg-white rounded flex flex-col items-center text-sm text-[#979797]'>
                {filteredUsers.length > 0 ? <h1>Users</h1> : null}
                <div className='border-t w-full pl-4'>
                    {filteredUsers.map((user, index) => (
                        <div onClick={()=> navigate(`/userProfile/${user?._id}`)} className='flex items-center border-b p-1 cursor-pointer' key={index}>
                            <div className='border border-[#720058] rounded-full overflow-hidden mr-2'>
                                <img className='w-[30px] h-[30px] object-cover' src={user?.profile_url ? user?.profile_url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSinUiRqVB94sfZZbtNZgPJswUTs4R7YDskvXfVjUSejKfQqAoMaedQBNfybdIdduiix4&usqp=CAU"} alt="profilepic" />
                            </div>
                            <p className='text-black'>{user.username}</p>
                        </div>
                    ))}
                </div>
                {filteredCommunities.length > 0 ? <h1>Communities</h1> : null}
                <div className='border-t w-full pl-4'>
                    {filteredCommunities.length > 0 ? (
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
                    )}
                </div>
                <div>
                    <p onClick={handleSearchPage} className='text-[11px] text-[#004272] hover:underline cursor-pointer'>See all</p>
                </div>
            </div>
            {modal && <CommunityOverview setModal={setModal} community={community}/>}
        </div>
    );

};

SearchBox.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    setSearchBox: PropTypes.func.isRequired
  };

export default SearchBox;
