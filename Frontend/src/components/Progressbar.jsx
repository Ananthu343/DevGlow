import React from 'react';
import PropTypes from 'prop-types'

const ProgressBar = ({ bgcolor, progress, height }) => {
    function calculatePercentage(number, maxNumber) {
        return (number / maxNumber) * 100;
       }
     const stars =   calculatePercentage(progress,1500)
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
