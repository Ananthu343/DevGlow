import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { savePost,reportUser } from '../slices/userSlice';
import { blockUser } from '../slices/postSlice';
import toast from 'react-hot-toast';
import { updateCredentials } from '../slices/authSlice';

const DropdownMenu = ({ options, document, openEdit,setAbout,openAddUsers }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch()

    const handleOptionClick = (option) => {
        switch (option) {
            case "Save Post":
                // Save post logic
                dispatch(savePost(document._id))
                break;
            case "Edit Post":
                // Edit post logic
                openEdit(document)
                break;
            case "Report User":
                // Report user logic
                dispatch(reportUser(document.creatorId))
                break;
            case "Block User":
                dispatch(blockUser(document.creatorId)).then((action)=>{
                    if (action.meta.requestStatus === "rejected"){
                        const errorMessage = "Unable to block";
                        toast.error(errorMessage);
                    } else {
                        dispatch(updateCredentials({devGlowAccess: action.payload}));
                    }
                   })
                break;
            case "About":
                setAbout(true)
                break;    
            case "Add users":
                openAddUsers(true)
                break;    
            default:
                break;
        }
    };

    return (
        <div className="relative z-5">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="focus:outline-none"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-three-dots-vertical hover:bg-gray-100 rounded-full"
                    viewBox="0 0 16 16"
                >
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleOptionClick(option)}
                                className="block px-4 w-full py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                role="menuitem"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default DropdownMenu
