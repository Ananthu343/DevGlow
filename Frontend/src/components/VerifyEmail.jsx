import React from 'react'

const VerifyEmail = () => {
    return (
        <div className="fixed z-50 inset-0 bg-white bg-opacity-50 backdrop-blur-md flex items-center justify-center">
            <div className="flex justify-center items-center h-screen">
                <div aria-label="Loading..." role="status" className="flex items-center space-x-2">
                    <span className="text-4xl font-medium text-gray-500">An verify link is send to your email id</span>
                </div>
            </div>
        </div>
    );
}

export default VerifyEmail
