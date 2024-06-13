import React from 'react'
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterIcon,
  TwitterShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  EmailIcon,
  EmailShareButton,
} from 'react-share';

import PropTypes from 'prop-types'

const Share = ({ setOpenShare }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='absolute w-screen h-full bg-black/60 flex justify-center items-center z-[100] top-0'>
        <div className='bg-white rounded-[10px] w-[400px] h-auto p-3 flex flex-col justify-center text-[#720058] text-sm'>
          <div className='flex justify-between items-center mb-3'>
            <h4 className='text-sm font-semibold'>Share post</h4>
            <div className='flex justify-end'>
              <button onClick={() => setOpenShare(false)}><img className='w-7' src="close.jpg" alt="close" /></button>
            </div>
          </div>
          <div className='flex w-[50%] justify-around'>
            <FacebookShareButton
              url={'http://localhost:3000/'}
              quote={'Dummy text!'}
              hashtag="#muo"
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <WhatsappShareButton
              url={'http://localhost:3000/'}
              title={'Check out this cool website!'}
              separator=":: "
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <TwitterShareButton
              url={'http://localhost:3000/'}
              title={'Check out this cool website!'}
              hashtags={['example', 'website']}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <LinkedinShareButton
              url={'http://localhost:3000/'}
              title={'Check out this cool website!'}
            >
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <EmailShareButton
              url={'http://localhost:3000/'}
              subject={'Check out this cool website!'}
              body={'I thought you might find this interesting: https://www.example.com'}
            >
              <EmailIcon size={32} round />
            </EmailShareButton>
          </div>
        </div>
      </div>
    </div>
  );
};

Share.propTypes = {
  setOpenShare: PropTypes.func.isRequired,
};

export default Share;
