import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Header from "./components/userComponents/Header";
import Login from "./pages/Login";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
import VerifyEmail from "./components/userComponents/VerifyEmail";
import Verify from "./components/userComponents/Verify";


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
        </Routes>
     </Router>
    </>
  );
}

export default App;
