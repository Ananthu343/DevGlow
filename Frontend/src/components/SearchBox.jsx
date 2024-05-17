import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const SearchBox = ({ setSearchBox, searchTerm }) => {
    const { users } = useSelector(state => state.post);
    const navigate = useNavigate()

    const filteredUsers = useMemo(() => {
        if (searchTerm !== '') {
            return users.filter(user => user.username.toLowerCase().includes(searchTerm.toLowerCase()));
        } else {
            return [];
        }
    }, [searchTerm, users]);

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
        <div onClick={() => setSearchBox(false)} className='fixed w-full h-screen bg-black/50 pt-[55px] hidden md:block md:pl-[180px] lg:pl-[270px] z-10'>
            <div onClick={stopPropagation} className='w-[250px] h-auto bg-white rounded flex flex-col items-center text-sm text-[#979797]'>
                <h1>Search for results</h1>
                <div className='border-t w-full pl-4'>
                    {filteredUsers.map((user, index) => (
                        <div className='flex items-center border-b p-1 cursor-pointer' key={index}>
                            <div className='border border-[#720058] rounded-full overflow-hidden mr-2'>
                                <img className='w-[30px] h-[30px] object-cover' src={user?.profile_url ? user?.profile_url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSinUiRqVB94sfZZbtNZgPJswUTs4R7YDskvXfVjUSejKfQqAoMaedQBNfybdIdduiix4&usqp=CAU"} alt="profilepic" />
                            </div>
                            <p className='text-black'>{user.username}</p>
                        </div>
                    ))}
                </div>
                <div>
                    <p onClick={handleSearchPage} className='text-[11px] text-[#004272] hover:underline cursor-pointer'>See all</p>
                </div>
            </div>
        </div>
    );

};

export default SearchBox;
