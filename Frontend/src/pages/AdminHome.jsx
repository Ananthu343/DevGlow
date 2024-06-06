import React, { useState } from 'react';
import Dashboard from '../components/Dashboard';
import UserManage from '../components/UserManage';
import CommunityManage from '../components/CommunityManage';
import BadgeManage from '../components/BadgeManage';
import LeaderboardManage from '../components/LeaderboardManage';
import ContentManage from '../components/ContentManage';

const AdminHome = () => {
  const [selectedMenu, setSelectedMenu] = useState('dashboard');

  const menus = [
    'dashboard',
    'user manage',
    'community manage',
    'badge manage',
    'leaderboard manage',
    'content manage',
  ];

  const handleMenu = (value) => {
    setSelectedMenu(value);
  };

  return (
    <div className='w-full top-0 flex justify-center pt-[55px] mb-2'>
      <div className='h-auto w-full md:w-[85%] lg:rounded-2xl shadow-lg flex justify-between'>
        <div className='lg:flex justify-between w-full'>
          <div className='hidden h-[600px] border-r lg:flex w-[30%] bg-white p-3 flex-col rounded-l text-sm font-semibold items-center'>
            <h1 className='text-[#004272] font-bold mb-4 underline'>Admin Panel</h1>
            {menus.map((menu) => (
              <div
                key={menu}
                onClick={() => handleMenu(menu)}
                className={`w-full h-[50px] shadow flex justify-center items-center cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 ${
                  selectedMenu === menu ? 'bg-gray-200 text-[#720058]' : 'text-gray-500'
                }`}
              >
                {menu.toUpperCase()}
              </div>
            ))}
          </div>
          <div className='w-full bg-white h-[400px] lg:h-auto flex justify-center items-center p-2'>
            {selectedMenu === 'dashboard' && <Dashboard/>}
            {selectedMenu === 'user manage' && <UserManage/>}
            {selectedMenu === 'community manage' && <CommunityManage/>}
            {selectedMenu === 'badge manage' && <BadgeManage/>}
            {selectedMenu === 'leaderboard manage' && <LeaderboardManage/>}
            {selectedMenu === 'content manage' && <ContentManage/>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
