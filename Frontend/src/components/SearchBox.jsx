import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CommunityOverview from './CommunityOverview';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types'

const SearchBox = ({ setSearchBox, searchTerm }) => {
    const { users } = useSelector(state => state.post);
    const { communities } = useSelector(state => state.community);
    const navigate = useNavigate()
    const [modal, setModal] = useState(false)
    const [community, setCommunity] = useState({})
    const searchTermRef = useRef();

    const handleOverview = (community) => {
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
        <div onClick={() => setSearchBox(false)} className='fixed inset-0 w-full h-screen bg-transparent z-[90] flex justify-center lg:justify-start lg:pl-[300px] pt-[70px]'>
            <div onClick={stopPropagation} className='w-[90%] md:w-[350px] max-h-[70vh] overflow-y-auto bg-white/95 backdrop-blur-xl rounded-2xl shadow-glass border border-slate-200 flex flex-col text-sm text-slate-700 animate-fade-in'>
                
                {filteredUsers.length > 0 && <h1 className='text-xs font-bold uppercase tracking-wider text-slate-400 px-4 pt-4 pb-2'>Users</h1>}
                <div className='w-full'>
                    {filteredUsers.map((user, index) => (
                        <div onClick={() => navigate(`/userProfile/${user?._id}`)} className='flex items-center p-3 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-100 last:border-0' key={index}>
                            <div className='rounded-full overflow-hidden mr-3 shadow-sm border border-slate-100'>
                                <img className='w-10 h-10 object-cover' src={user?.profile_url ? user?.profile_url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSinUiRqVB94sfZZbtNZgPJswUTs4R7YDskvXfVjUSejKfQqAoMaedQBNfybdIdduiix4&usqp=CAU"} alt="profilepic" />
                            </div>
                            <p className='font-semibold text-slate-800'>{user.username}</p>
                        </div>
                    ))}
                </div>
                
                {filteredCommunities.length > 0 && <h1 className='text-xs font-bold uppercase tracking-wider text-slate-400 px-4 pt-4 pb-2 border-t border-slate-100 mt-2'>Communities</h1>}
                <div className='w-full'>
                    {filteredCommunities.length > 0 ? (
                        filteredCommunities.map((community) => (
                            <div onClick={() => handleOverview(community)} key={community._id} className="flex items-center justify-between p-3 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-100 last:border-0">
                                <div className="flex items-center">
                                    <img src={community.profile_url ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL0sjQoYo1rZf1oYqSaRE9Q8Itv7fbij4aXRgoeAQFhw&s"} alt="Community Profile" className="w-10 h-10 object-cover rounded-xl mr-3 shadow-sm border border-slate-100" />
                                    <div className='flex flex-col'>
                                        <span className="font-semibold text-slate-800">{community.name ?? "No_name"}</span>
                                        <small className="text-slate-500 font-medium">{community.members.length} Members</small>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded-md">Public</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-slate-500 py-4">No communities found.</p>
                    )}
                </div>
                
                <div className='p-3 bg-slate-50 border-t border-slate-100 mt-auto rounded-b-2xl flex justify-center'>
                    <p onClick={handleSearchPage} className='text-sm font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer text-center w-full py-1 hover:bg-indigo-50 rounded-lg transition-colors'>See all results</p>
                </div>
            </div>
            {modal && <CommunityOverview setModal={setModal} community={community} />}
        </div>
    );

};

SearchBox.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    setSearchBox: PropTypes.func.isRequired
};

export default SearchBox;
