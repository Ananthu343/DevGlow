import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deletePost, editPost } from '../slices/userSlice';
import { updateFeed, updateFeedAfterDelete } from '../slices/postSlice';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types'

const EditPost = ({ setModal, post }) => {
    const [preview, setPreview] = useState(null);
    const [description, setDescription] = useState(post.description)
    const [visibility, setVisibility] = useState(post.visibility)
    const [media, setMedia] = useState({})

    useEffect(() => {
        if (post.media) {
            if (post.media.includes("mp4")) {
                setPreview(<video controls src={post.media} />)
            } else {
                setPreview(<img src={post.media} alt="File Preview" />)
            }
        }
    }, [post])

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
        formData.append('id', post._id)
        formData.append('description', description)
        formData.append('visibility', visibility)
        formData.append('fileUpload', media)
        setModal(false)
        dispatch(editPost(formData)).then((action) => {
            if (action.meta.requestStatus === "rejected") {
                const errorMessage = "Edit error";
                toast.error(errorMessage);
            } else {
                toast.success("Saved")
                dispatch(updateFeed(action.payload.updatedPost));
            }
        })

    }

    const handleDelete = () => {
        setModal(false)

        dispatch(deletePost(post._id)).then((action) => {
            if (action.meta.requestStatus === "rejected") {
                const errorMessage = "Unable to delete";
                toast.error(errorMessage);
            } else {
                dispatch(updateFeedAfterDelete({ postId: post._id }))
                toast.success("Deleted")
            }
        })
    }

    return (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
            <div className='absolute w-screen h-full bg-black/60 flex justify-center items-center z-[100] top-0'>
                <div className='bg-white rounded-[10px] w-[400px] h-auto p-3 flex flex-col justify-center text-[#720058] text-sm'>
                    <form onSubmit={handleSubmit}>
                        <div className='flex justify-between items-center mb-3'>
                            <h4 className='text-sm font-semibold'>Edit post</h4>
                            <div className='flex justify-between'>
                                <h1 className='text-red-500 flex items-center font-semibold mr-3 cursor-pointer hover:underline' onClick={handleDelete}><img className='w-4' src="delete.png" alt="delete" />Delete</h1>
                                <button onClick={() => setModal(false)}><img className='w-7' src="close.jpg" alt="close" /></button>
                            </div>
                        </div>
                        <p className='text-xs text-black'>Description</p>
                        <input
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            type="text"
                            placeholder="Description"
                            className="block w-full text-black p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                        <p className='text-xs text-black'>Visibility</p>
                        <select onChange={(e) => setVisibility(e.target.value)} className="block w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                            <option value={post.visibility}>{post.visibility}</option>
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
                        <button type="submit" className="w-full py-2 bg-[#004272] text-white rounded hover:bg-[#005f72] transition duration-200">Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

EditPost.propTypes = {
    post: PropTypes.object.isRequired,
    setModal: PropTypes.func.isRequired
};

export default EditPost
