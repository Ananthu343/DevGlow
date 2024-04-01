import React from 'react'
import { useSelector } from 'react-redux'
import Loader from './Loader'

const LoadingPage = () => {
    const {loading} = useSelector(state => state.user)
    const {feed} = useSelector(state => state.post)
  return (
    <div>
      {loading && <Loader/>}
      {!feed && <Loader/>}
    </div>
  )
}

export default LoadingPage
