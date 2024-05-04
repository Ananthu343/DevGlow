import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadPost } from '../slices/userSlice';
import { updateFeedAfterUpload } from '../slices/postSlice';
import toast from 'react-hot-toast';

const CreatePost = ({ setModal }) => {
    const [preview, setPreview] = useState(null);
    const [description, setDescription] = useState("")
    const [visibility, setVisibility] = useState("")
    const [media, setMedia] = useState({});

    const dispatch = useDispatch()

    const formData = new FormData()

    const uploadFile = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileType = file.type.split('/')[0];
            const previewURL = URL.createObjectURL(file);

            if (fileType === 'image') {
                setPreview(<img src={previewURL} alt="File Preview" />);
            } else if (fileType === 'video') {
                setPreview(<video controls src={previewURL} />);
            }
        }
        setMedia(file)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        formData.append('description', description)
        formData.append('visibility', visibility)
        formData.append('fileUpload', media)
        console.log(formData);
        dispatch(uploadPost(formData)).then((action) => {
            if (action.meta.requestStatus === "rejected") {
                const errorMessage = "Upload error";
                toast.error(errorMessage);
            } else {
                dispatch(updateFeedAfterUpload(action.payload))
                toast.success("Uploaded")
            }
        })
        setModal(false)
    }
    return (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
            <div className='absolute w-screen h-full bg-black/60 flex justify-center items-center z-[100] top-0'>
                <div className='bg-white rounded-[10px] w-[400px] h-auto p-3 flex flex-col justify-center text-[#720058] text-sm'>
                    <form onSubmit={handleSubmit}>
                        <div className='flex justify-between items-center mb-3'>
                            <h4 className='text-sm font-semibold'>Create post</h4>
                            <button onClick={() => setModal(false)}><img className='w-7' src="close.jpg" alt="close" /></button>
                        </div>
                        <input
                            onChange={(e) => setDescription(e.target.value)}
                            type="text"
                            placeholder="Description"
                            className="block w-full text-black p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                        <select onChange={(e) => setVisibility(e.target.value)} className="block w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                            <option value="">Select visibility</option>
                            <option value="Public">Public</option>
                            <option value="Followers">Followers</option>
                            <option value="Me only">Me only</option>
                        </select>
                        <label className="block mt-2">
                            <span className="text-sm font-medium text-gray-900">Upload file</span>
                            <input
                                type="file"
                                accept="image/*, video/*"
                                className="block w-full cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-transparent text-sm rounded-lg mt-1"
                                id="fileUpload"
                                onChange={uploadFile}
                            />
                        </label>
                        <div
                            id="preview"
                            style={{ height: preview ? '250px' : 'auto' }}
                            className="mt-4 w-full border flex justify-center"
                        >
                            {preview}
                        </div>
                        <button type="submit" className="w-full py-2 bg-[#004272] text-white rounded hover:bg-[#005f72] transition duration-200">Upload</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreatePost
