import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from '../pages/Home';
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import VerifyEmail from "../components/VerifyEmail";
import Verify from "../components/Verify";
import PrivateRoute from "../components/PrivateRoute";
import MyProfile from "../pages/MyProfile";
import Community from "../pages/Community";
import Messages from "../pages/Messages";
import Leaderboard from "../pages/Leaderboard";
import Search from "../pages/Search";
import PostDisplay from '../components/PostDisplay';
import AdminPrivateRoute from '../components/AdminPrivateRoute';
import AdminHome from '../pages/AdminHome';

const UserRoutes = () => {
  return (
    <Routes>
      {/* user side */}
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/verifying" element={<VerifyEmail/>}/>
          <Route path="/verifyEmail/:token" element={<Verify/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/searchPage/:value" element={<Search/>}/>
          <Route path="/post/:postId" element={<PostDisplay/>}/>
          <Route path="" element={<PrivateRoute/>}>
              <Route path="/profile" element={<MyProfile/>} />
              <Route path="/community" element={<Community/>} />
              <Route path="/messages" element={<Messages/>} />
              <Route path="/leaderboard" element={<Leaderboard/>} />
          </Route>
          {/* admin side */}
          <Route path="" element={<AdminPrivateRoute/>}>
            <Route  path="/admin" element={<AdminHome/>} />
          </Route>
   </Routes>
  )
}

export default UserRoutes