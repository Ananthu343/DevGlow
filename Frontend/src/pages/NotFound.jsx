import React from 'react';
import { motion } from 'framer-motion';

const NotFound = () => {
  const variants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="not-found"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
        <div className='flex flex-col w-screen h-screen justify-center items-center bg-white'>
           <h1 className='font-bold text-[100px]'>Oops!</h1>
           <p className='font-semibold text-[50px]'>Page not found.</p>
           <a className='text-[#004272]' href="/">Go back home</a>

        </div>
    </motion.div>
  );
};

export default NotFound;
