import React,{useEffect,useState} from 'react'
import { useDispatch } from 'react-redux'
import { verifyToken } from '../../slices/userSlice'
import { useParams ,useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'

const Verify = () => {
    const { token } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [hasRun, setHasRun] = useState(false);

    useEffect(()=>{
        if(!hasRun){
            setHasRun(true)
            dispatch(verifyToken({token})).then((res)=>{
                if (res.meta.requestStatus === "rejected"){
                    const errorMessage = "Invalid token!";
                    toast.error(errorMessage);
                    navigate("/signup")
                  }else {
                        toast.success("Account created !")
                        navigate("/login")
                  }
            })
        }
    },[token, hasRun, dispatch, navigate])

  return (
    <div className="fixed z-50 inset-0 bg-white bg-opacity-50 backdrop-blur-md flex items-center justify-center">
            <div className="flex justify-center items-center h-screen">
                <div aria-label="Loading..." role="status" class="flex items-center space-x-2">
                    <svg className="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
                        <line x1="128" y1="32" x2="128" y2="64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                        <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" strokeLinecap="round" strokeLinejoin="round"
                            strokeWidth="24"></line>
                        <line x1="224" y1="128" x2="192" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24">
                        </line>
                        <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" strokeLinecap="round" strokeLinejoin="round"
                            strokeWidth="24"></line>
                        <line x1="128" y1="224" x2="128" y2="192" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24">
                        </line>
                        <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" strokeLinecap="round" strokeLinejoin="round"
                            strokeWidth="24"></line>
                        <line x1="32" y1="128" x2="64" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                        <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24">
                        </line>
                    </svg>
                    <span className="text-4xl font-medium text-gray-500">Verifying..</span>
                </div>
            </div>
        </div>
  )
}

export default Verify
