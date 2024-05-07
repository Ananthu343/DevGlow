import React from 'react';

const UserCard = ({ user }) => {
 return (
    <div className="flex p-2 w-full bg-gray-300 shadow-lg items-center">
        {user.profile_url ? <div className='border border-[#720058] rounded-full overflow-hidden mr-2'>
                      <img className='w-[40px] h-[40px] object-cover' src={user?.profile_url ? user?.profile_url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSinUiRqVB94sfZZbtNZgPJswUTs4R7YDskvXfVjUSejKfQqAoMaedQBNfybdIdduiix4&usqp=CAU"} alt="profilepic" />
                    </div>
        : <img className='border border-[#720058] w-7 rounded-full mr-2 hidden lg:flex' 
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSinUiRqVB94sfZZbtNZgPJswUTs4R7YDskvXfVjUSejKfQqAoMaedQBNfybdIdduiix4&usqp=CAU" 
        alt="profile pic" />
    }
      
      <h2 className="text-sm font-semibold">{user.username}</h2>
      {/* <p className="">{user.about}</p> */}
    </div>
 );
};

export default UserCard;