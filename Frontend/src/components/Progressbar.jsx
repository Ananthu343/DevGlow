import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux';

const ProgressBar = ({ bgcolor, progress, height }) => {
   const { badges } = useSelector(state => state.leaderboard)
   const [topBadge, setTopBadge] = useState({})

   useEffect(() => {
      const max = badges.reduce((acc, curr) => {
         acc = curr.min_stars > acc ? curr : acc
         return acc
      }, 0)
      setTopBadge(max)
   }, [badges])

   function calculatePercentage(number, maxNumber) {
      return (number / maxNumber) * 100;
   }
   const stars = calculatePercentage(progress, topBadge?.min_stars)
   const ParentDivStyle = {
      height: height,
      width: '400px',
      backgroundColor: 'whitesmoke',
      borderRadius: 40,
      margin: 30
   };

   const ChildDivStyle = {
      height: '100%',
      width: `${stars}%`,
      backgroundColor: bgcolor,
      borderRadius: 40,
      textAlign: 'right',
   };

   const progressTextStyle = {
      padding: 10,
      color: 'black',
      fontWeight: 500,
   };

   return (
      <div style={ParentDivStyle}>
         <div style={ChildDivStyle}>
            <span style={progressTextStyle}>{`${progress}`} stars</span>
         </div>
      </div>
   );
};

ProgressBar.propTypes = {
   bgcolor: PropTypes.string.isRequired,
   progress: PropTypes.number.isRequired,
   height: PropTypes.number.isRequired,
};

export default ProgressBar;
