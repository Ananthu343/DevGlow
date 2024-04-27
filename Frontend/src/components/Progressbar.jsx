import React from 'react';

const ProgressBar = ({ bgcolor, progress, height }) => {
 const ParentDivStyle = {
    height: height,
    width: '400px',
    backgroundColor: 'whitesmoke',
    borderRadius: 40,
    margin: 30
 };

 const ChildDivStyle = {
    height: '100%',
    width: `${progress}%`,
    backgroundColor: bgcolor,
    borderRadius: 40,
    textAlign: 'right'
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

export default ProgressBar;
