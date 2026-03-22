import React, { useState } from 'react';
import Dashboard from '../components/Dashboard';
import UserManage from '../components/UserManage';
import CommunityManage from '../components/CommunityManage';
import BadgeManage from '../components/BadgeManage';
import { Suspense } from 'react';
import Loader from '../components/Loader';
const ContentManage = React.lazy(() => import('../components/ContentManage'))


const AdminHome = () => {
  const [selectedMenu, setSelectedMenu] = useState('dashboard');

  const menus = [
    'dashboard',
    'user manage',
    'community manage',
    'badge manage',
    'content manage',
  ];

  const handleMenu = (value) => {
    setSelectedMenu(value);
  };

  return (
    <div className="w-full max-w-7xl mx-auto pt-[85px] px-4 flex justify-center mb-8">
      <div className="w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-soft border border-slate-100 overflow-hidden flex flex-col lg:flex-row min-h-[700px]">
          <div className='hidden lg:flex w-[280px] bg-slate-50 p-6 flex-col border-r border-slate-200 flex-shrink-0'>
            <h1 className='text-2xl text-slate-800 font-bold mb-8 tracking-tight'>Admin Panel</h1>
            <div className='flex flex-col gap-3'>
            {menus.map((menu) => (
              <div
                key={menu}
                onClick={() => handleMenu(menu)}
                className={`w-full px-5 py-3.5 rounded-2xl flex items-center cursor-pointer transition-all font-semibold shadow-sm ${selectedMenu === menu ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                  }`}
              >
                {menu.charAt(0).toUpperCase() + menu.slice(1)}
              </div>
            ))}
            </div>
          </div>
          <div className='w-full bg-transparent flex-grow p-6 lg:p-10 overflow-y-auto'>
            {selectedMenu === 'dashboard' && <Dashboard />}
            {selectedMenu === 'user manage' && <UserManage />}
            {selectedMenu === 'community manage' && <CommunityManage />}
            {selectedMenu === 'badge manage' && <BadgeManage />}
            <Suspense fallback={<Loader />}>
              {selectedMenu === 'content manage' && <ContentManage />}
            </Suspense>
          </div>
      </div>
    </div>
  );
};

export default AdminHome;
