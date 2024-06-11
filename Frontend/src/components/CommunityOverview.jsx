import { useState,useEffect } from 'react'
import React from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { joinCommunity,editCommunity,deleteCommunity, leaveCommunity } from '../slices/communitySlice'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import UserCard from './UserCard'

const CommunityOverview = ({ community, setModal }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userInfo } = useSelector(state => state.auth)
    const { users } = useSelector(state => state.post)
    const [isEditing, setIsEditing] = useState(false);
    const [member, setMember] = useState(false);
    const [members, showMembers] = useState(false);
    const [creator, setCreator] = useState('');
    const [name, setName] = useState(community.name)
    const [description, setDescription] = useState(community.description)
    const [privacy, setPrivacy] = useState(community.privacy)
    const [userLimit, setUserLimit] = useState(community.user_limit)
    const [media, setMedia] = useState({});
    const [preview, setPreview] = useState(community.profile_url);

    const formData = new FormData()

    useEffect(()=>{
       if (community.members.includes(userInfo?.devGlowAccess._id)) {
           setMember(true)
       }
       const creatorData = users?.find(ele => ele._id === community.creatorId)
       setCreator(creatorData)
    },[community.members,userInfo])

    const handleJoin = () => {
        if (userInfo) {
            if (member) {
                dispatch(leaveCommunity(community._id)).then((action) => {
                    if (action.meta.requestStatus === "rejected") {
                        const errorMessage = "Unable to leave";
                        toast.error(errorMessage);
                    } else {
                        toast.success("Leaved")
                        setModal(false)
                    }
                })
            }else{
                dispatch(joinCommunity(community._id)).then((action) => {
                    if (action.meta.requestStatus === "rejected") {
                        const errorMessage = "Unable to join";
                        toast.error(errorMessage);
                    } else {
                        toast.success("Joined")
                        setModal(false)
                    }
                })
            }
        } else {
            toast.error("You need to login")
        }
        
    }

    
    const uploadFile = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileType = file.type.split('/')[0];
            const previewURL = URL.createObjectURL(file);
            
            if (fileType === 'image') {
                setPreview(previewURL);
            } else {
                toast.error("Select a image file")
            }
        }
        setMedia(file)
    }

    const handleSave = (e) => {
        e.preventDefault();
        formData.append('id',community._id)
        formData.append('name', name)
        formData.append('description', description)
        formData.append('privacy', privacy)
        formData.append('userLimit', userLimit)
        formData.append('fileUpload', media)
        dispatch(editCommunity(formData)).then((action) => {
            if (action.meta.requestStatus === "rejected") {
                const errorMessage = "Unable to save";
                toast.error(errorMessage);
            } else {
                toast.success("Saved")
                setModal(false)
            }
        })
        setIsEditing(false)
        setModal(false);
    };

    const handleDelete = ()=>{
        dispatch(deleteCommunity(community._id)).then((action) => {
            if (action.meta.requestStatus === "rejected") {
                const errorMessage = "Unable to delete";
                toast.error(errorMessage);
            } else {
                toast.success("Deleted")
                setModal(false)
            }
        })
        setIsEditing(false)
        setModal(false);
    }
    
    return (
        <div className='fixed inset-0 flex items-center justify-center z-1000'>
            <div className='absolute w-screen h-full bg-black/60 flex justify-center items-center z-[1000] top-0'>
                <div className='bg-white rounded-[10px] w-[400px] h-auto p-3 flex flex-col justify-center text-[#720058] text-sm'>
                    <div className='flex items-center justify-between mb-4'>
                        <img src={preview ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL0sjQoYo1rZf1oYqSaRE9Q8Itv7fbij4aXRgoeAQFhw&s"} alt="Community Profile" className="w-24 h-24 object-cover rounded-full border-2 border-[#720058]" />
                        <div className='flex flex-col p-2 h-auto'>
                            {isEditing ? <input
                                value={name || ""}
                                onChange={e => setName(e.target.value)}
                                type="text"
                                id="name"
                                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                placeholder="Community full name"
                                required
                            /> : <h2 className="text-xl font-semibold">{community.name ?? "No_name"}</h2>}
                            {isEditing ? <input
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                type="text"
                                id="description"
                                className="mt-2 bg-indigo-50 border  border-indigo-300 text-gray-400 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                placeholder="Give an intro for your community"
                                required
                            /> : <p className="text-gray-500">{community.description}</p>}
                            {isEditing && <div className='mt-4'><input
                                type="file"
                                className="sr-only "
                                id="fileUpload"
                                onChange={uploadFile}
                            />
                                <label
                                    htmlFor="fileUpload"
                                    className="text-sm font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg p-2 border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 cursor-pointer"
                                >
                                    Change image
                                </label></div>}
                                <p className='text-sm hover:underline cursor-pointer' onClick={()=> navigate(`/userProfile/${creator._id}`)}>Creator : {creator.username}</p>
                        </div>
                    </div>
                    <hr className="my-4 border-t border-gray-200" />
                    <div className="flex items-center justify-between">
                        <div className='hover:underline cursor-pointer'>
                            <span onClick={()=>showMembers(!members)} className="text-sm font-medium text-gray-700">Members:</span>
                            <span className="text-sm font-medium text-gray-700">{community.members.length}</span>
                        </div>
                        <div>
                            <span className="text-sm font-medium text-gray-700">Privacy:</span>
                            {isEditing ? <select value={privacy} onChange={(e) => setPrivacy(e.target.value)} className="block w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                                <option value="public">Public</option>
                                <option value="no one">No one</option>
                            </select> : <span className="text-sm font-medium text-gray-700">{community.privacy}</span>}
                        </div>
                        <div>
                            <span className="text-sm font-medium text-gray-700">limit:</span>
                            {isEditing ? <input
                                onChange={e => setUserLimit(e.target.value)}
                                type="text"
                                id="userLimit"
                                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                placeholder="Max limit"
                                value={userLimit}
                            /> : <span className="text-sm font-medium text-gray-700">{community.user_limit}</span>}
                        </div>
                    </div>
                    <div className="mt-4 flex w-full justify-between">
                        <button onClick={() => setModal(false)} className="bg-indigo-600 text-white px-4 py-2 rounded">Close</button>
                        {isEditing && <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>}
                        {community.creatorId !== userInfo?.devGlowAccess._id ? <button onClick={() => handleJoin()} className={`${member ? "bg-red-600" : "bg-indigo-600"} text-white px-4 py-2 rounded`}>{member ? "Leave" : "Join"}</button> : isEditing ? <button onClick={handleSave} className="text-white px-4 py-2 rounded bg-[#720058]">Save</button> : <button onClick={() => setIsEditing(true)} className="bg-indigo-600 text-white px-4 py-2 rounded">Edit</button>}
                    </div>
                    {
                        members && <div className='w-full h-[200px] flex flex-col overflow-y-scroll'>
                        {
                           community.members.map((userId,index)=>{
                            const user = users.find(ele => ele._id === userId)
                            return <UserCard key={index} user={user} />
                           })
                        }
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

CommunityOverview.propTypes = {
    community: PropTypes.object.isRequired, 
    setModal: PropTypes.func.isRequired
}

export default CommunityOverview
