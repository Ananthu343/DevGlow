import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const BottomNavTabs = () => {
  const { userInfo } = useSelector(state => state.auth)

  const [active, setActive] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    if (!userInfo) {
      setActive(0)
    }
  }, [userInfo, active])

  const handleNavigate = (page, index) => {
    switch (page) {
      case "Home":
        navigate('/')
        setActive(index)
        break;

      case "Community":
        navigate('/community')
        setActive(index)
        break;

      case "Message":
        navigate('/messages')
        setActive(index)
        break;

      case "Leaderboard":
        navigate('/leaderboard')
        setActive(index)
        break;

      default:
        navigate('/')
        setActive(0)
        break;
    }
  }


  const icons = [
    { name: "Home", src: "Home.png", alt: "home icon" },
    { name: "Community", src: "community.png", alt: "community icon" },
    { name: "Message", src: "message.jpg", alt: "message icon" },
    { name: "Leaderboard", src: "Leaderboard.png", alt: "leaderboard icon" },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 z-[100] w-full h-16 bg-white/85 backdrop-blur-md border-t border-slate-200 pb-safe">
      <div className="flex justify-around items-center h-full">
        {icons.map((icon, index) => (
          <button
            key={index}
            type="button"
            className={`p-2 transition-all duration-200 flex flex-col items-center justify-center ${index === active ? 'border-t-2 border-slate-900 -mt-[2px]' : 'opacity-60 hover:opacity-100'}`}
            onClick={() => handleNavigate(icon.name, index)}
          >
            <img className={`w-6 ${index === active ? 'scale-110' : ''}`} src={icon.src} alt={icon.alt} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavTabs;
