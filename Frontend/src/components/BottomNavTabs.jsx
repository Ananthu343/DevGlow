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
    <div className="lg:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200">
      <div className="flex justify-around items-center">
        {icons.map((icon, index) => (
          <button
            key={index}
            type="button"
            className={`p-2 rounded-md ${index === active ? 'border-b shadow-lg border-[#720058]' : ''}`}
            onClick={() => handleNavigate(icon.name, index)}
          >
            <img className='w-6' src={icon.src} alt={icon.alt} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavTabs;
