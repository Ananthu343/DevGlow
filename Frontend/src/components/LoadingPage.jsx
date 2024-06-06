import React from 'react'
import { useSelector } from 'react-redux'
import Loader from './Loader'

const LoadingPage = () => {
    const {loading} = useSelector(state => state.user)
    const {loadingAdminPage} = useSelector(state => state.admin)
    console.log(loadingAdminPage);
  return (
    <div>
      {loading && <Loader/>}
      {loadingAdminPage && <Loader/>}
    </div>
  )
}

export default LoadingPage
