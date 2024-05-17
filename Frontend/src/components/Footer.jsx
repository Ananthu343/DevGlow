import React from 'react'

const Footer = () => {
  return (
    <footer className="h-[230px] flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between bg-white">
      <div className="flex-grow">
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <a href="#" className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500">About Us</a>
          </li>
          <li>
            <a href="#" className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500">License</a>
          </li>
          <li>
            <a href="#" className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500">Contribute</a>
          </li>
          <li>
            <a href="#" className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500">Contact Us</a>
          </li>
        </ul>
      </div>
      <div className="text-sm text-gray-500">
        &copy; 2023 Your Company Name. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer
