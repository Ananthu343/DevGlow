import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Header from "./components/userComponents/Header";
import Login from "./pages/Login";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
import VerifyEmail from "./components/userComponents/VerifyEmail";
import Verify from "./components/userComponents/Verify";
import PrivateRoute from "./components/userComponents/PrivateRoute";
import MyProfile from "./pages/MyProfile";
import Community from "./pages/Community";
import Messages from "./pages/Messages";
import Leaderboard from "./pages/Leaderboard";


function App() {
  const {loading} = useSelector(state => state.user)
  return (
    <>
      {loading && <Loader/>}
      <Router>
      <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/verifying" element={<VerifyEmail/>}/>
          <Route path="/verifyEmail/:token" element={<Verify/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="" element={<PrivateRoute/>}>
              <Route path="/profile" element={<MyProfile/>} />
              <Route path="/community" element={<Community/>} />
              <Route path="/messages" element={<Messages/>} />
              <Route path="/leaderboard" element={<Leaderboard/>} />
          </Route>
        </Routes>
     </Router>
    </>
  );
}

export default App;
