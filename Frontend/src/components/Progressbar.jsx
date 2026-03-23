import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux';

const ProgressBar = ({ bgcolor, progress, height }) => {
   const { badges } = useSelector(state => state.leaderboard)
   const [topBadge, setTopBadge] = useState({})

   useEffect(() => {
      if (badges && badges.length > 0) {
         const max = badges.reduce((acc, curr) => {
            return (curr.min_stars > (acc.min_stars || 0)) ? curr : acc;
         }, badges[0]);
         setTopBadge(max);
      }
   }, [badges]);

   function calculatePercentage(number, maxNumber) {
      if (!maxNumber || maxNumber === 0) return 0;
      const percentage = (number / maxNumber) * 100;
      return Math.min(percentage, 100); // Cap at 100%
   }

   const stars = calculatePercentage(progress, topBadge?.min_stars);

   const ParentDivStyle = {
      height: height,
      width: '100%',
      backgroundColor: '#f1f5f9', // slate-100
      borderRadius: 40,
      marginTop: 8,
      marginBottom: 8,
      overflow: 'hidden'
   };

   const ChildDivStyle = {
      height: '100%',
      width: `${stars}%`,
      backgroundColor: bgcolor,
      borderRadius: 40,
      transition: 'width 0.5s ease-in-out',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
   };

   const progressTextStyle = {
      paddingRight: 10,
      color: 'black',
      fontWeight: 500,
      fontSize: '10px',
      whiteSpace: 'nowrap'
   };

   return (
      <div className="w-full">
         <div style={ParentDivStyle}>
            <div style={ChildDivStyle}>
               {stars > 15 && <span style={progressTextStyle}>{progress} stars</span>}
            </div>
         </div>
         {stars <= 15 && <p className="text-[10px] font-medium text-slate-500 mt-1">{progress} stars</p>}
      </div>
   );
};

ProgressBar.propTypes = {
   bgcolor: PropTypes.string.isRequired,
   progress: PropTypes.number.isRequired,
   height: PropTypes.number.isRequired,
};

export default ProgressBar;
