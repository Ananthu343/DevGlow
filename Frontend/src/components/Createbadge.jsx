import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addBadge } from '../slices/adminSlice';
import { addToBadges } from '../slices/leaderboardSlice';

const CreateBadge = ({ setModal }) => {
    const [preview, setPreview] = useState(<img className='object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500'
        src="https://img.freepik.com/free-vector/shield_24908-54457.jpg?size=626&ext=jpg&ga=GA1.1.1141335507.1717804800&semt=ais_user"
        alt='badge_img' />);
    const [name, setName] = useState("")
    const [minStars, setMinStars] = useState("")
    const [media, setMedia] = useState({})

    const dispatch = useDispatch()
    const formData = new FormData()

    const uploadFile = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileType = file.type.split('/')[0];
            const previewURL = URL.createObjectURL(file);

            if (fileType === 'image') {
                setPreview(<img className='object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500' src={previewURL} alt="File Preview" />);
            } else {
                toast.error("Select a image file")
            }
        }
        setMedia(file)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        formData.append('name', name)
        formData.append('minStars', minStars)
        formData.append('fileUpload', media)
        dispatch(addBadge(formData)).then((action) => {
            if (action.meta.requestStatus === "rejected") {
                const errorMessage = "Error creating badge";
                toast.error(errorMessage);
            } else {
                toast.success("Created !")
                dispatch(addToBadges(action.payload))
            }
        })
        setModal(false)
    }

    return (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
            <div className='absolute w-screen h-full bg-black/60 flex justify-center items-center z-[100] top-0 '>
                <div className='bg-white rounded-[10px] w-[400px] h-auto p-3 flex flex-col justify-center text-[#720058] text-sm'>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                            {preview}
                            <div className="flex flex-col space-y-5 sm:ml-8">
                                <button onClick={() => setModal(false)}><img className='w-7 ml-[80%]' src="close.jpg" alt="close" /></button>

                                <input
                                    type="file"
                                    className="sr-only"
                                    id="fileUpload"
                                    onChange={uploadFile}
                                />
                                <label
                                    htmlFor="fileUpload"
                                    className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 cursor-pointer"
                                >
                                    Upload badge icon
                                </label>

                            </div>
                        </div>

                        <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                            <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                                <div className="w-full">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                                    >
                                        Badge name
                                    </label>
                                    <input
                                        onChange={e => setName(e.target.value)}
                                        type="text"
                                        id="name"
                                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                        placeholder="Badge full name"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-2 sm:mb-6">
                                <label
                                    htmlFor="minStars"
                                    className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                                >
                                    Minimum stars
                                </label>
                                <input
                                    onChange={e => setMinStars(e.target.value)}
                                    type="text"
                                    id="minStars"
                                    className="bg-indigo-50 border  border-indigo-300 text-gray-400 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                    placeholder="Give minimum star to get badge"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateBadge
