import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import toast from 'react-hot-toast';
import { editProfile } from '../slices/userSlice';
import PropTypes from 'prop-types'

const EditProfile = ({ setModal, setUser }) => {
  const { userInfo } = useSelector(state => state.auth)
  const [preview, setPreview] = useState(null);
  const [username, setUsername] = useState(userInfo?.devGlowAccess.username)
  const [about, setAbout] = useState(userInfo?.devGlowAccess?.about)
  const [gender, setGender] = useState(userInfo?.devGlowAccess?.gender)
  const [dob, setDob] = useState(userInfo?.devGlowAccess?.dob)
  const [media, setMedia] = useState({})

  useEffect(() => {
    if (userInfo?.devGlowAccess?.profile_url !== '') {
      setPreview(<img
        className='object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500'
        src={userInfo?.devGlowAccess?.profile_url} alt='profile_pic' />)
    } else {
      setPreview(<img className='object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500'
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSinUiRqVB94sfZZbtNZgPJswUTs4R7YDskvXfVjUSejKfQqAoMaedQBNfybdIdduiix4&usqp=CAU"
        alt='profile_pic' />)
    }
  }, [userInfo])

  const dispatch = useDispatch()
  const formData = new FormData()

  const uploadFile = (event) => {
    console.log("profile");
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
    formData.append('username', username)
    formData.append('about', about)
    formData.append('gender', gender)
    formData.append('dob', dob)
    formData.append('fileUpload', media)
    dispatch(editProfile(formData)).then((action) => {
      if (action.meta.requestStatus === "rejected") {
        const errorMessage = "Error updating profile";
        toast.error(errorMessage);
      } else {
        dispatch(setCredentials(action.payload));
        setUser(action.payload.devGlowAccess)
      }
    })
    setModal(false)
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='absolute w-screen h-full bg-black/60 flex justify-center items-center z-[100] top-0'>
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
                  Change Your Picture
                </label>

              </div>
            </div>

            <div className="items-center mt-8 sm:mt-14 text-[#202142]">
              <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                <div className="w-full">
                  <label
                    htmlFor="fullname"
                    className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                  >
                    Your Full name
                  </label>
                  <input
                    onChange={e => setUsername(e.target.value)}
                    type="text"
                    id="username"
                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="Your full name"
                    defaultValue={userInfo?.devGlowAccess.username}
                    required
                  />
                </div>
              </div>

              <div className="mb-2 sm:mb-6">
                <label
                  htmlFor="about"
                  className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                >
                  About
                </label>
                <input
                  onChange={e => setAbout(e.target.value)}
                  type="text"
                  id="about"
                  className="bg-indigo-50 border  border-indigo-300 text-gray-400 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                  placeholder="I am a developer"
                  required
                  defaultValue={userInfo?.devGlowAccess?.about}
                />
              </div>

              <div className="mb-2 sm:mb-6">
                <label
                  htmlFor="gender"
                  className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                >
                  Gender
                </label>
                <select onChange={(e) => setGender(e.target.value)} className="block w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                  <option value={userInfo?.devGlowAccess?.gender}>{userInfo?.devGlowAccess?.gender}</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div className="mb-2 sm:mb-6">
                <label
                  htmlFor="dob"
                  className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                >
                  Date of birth
                </label>
                <input
                  onChange={e => setDob(e.target.value)}
                  type="text"
                  id="dob"
                  className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                  placeholder="format : 21-05-2022"
                  value={userInfo?.devGlowAccess?.dob}
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

EditProfile.propTypes = {
  setModal: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired
};

export default EditProfile
