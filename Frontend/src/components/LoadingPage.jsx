import React from 'react'
import { useSelector } from 'react-redux'
import Loader from './Loader'

const LoadingPage = () => {
    const {loading} = useSelector(state => state.user)
  return (
    <div>
      {loading && <Loader/>}
    </div>
  )
}

export default LoadingPage
