import React from 'react';

const UserCard = ({ user }) => {
 return (
    <div className="cursor-pointer flex flex-col w-full hover:bg-gray-100 items-center mb-2">
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
 );
};

export default UserCard;