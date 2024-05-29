import { BrowserRouter as Router } from "react-router-dom"
import UserRoutes from "./routes/userRoutes";
import Header from "./components/Header";
import LoadingPage from "./components/LoadingPage";
import BottomNavTabs from "./components/BottomNavTabs";
import { useDispatch } from "react-redux";
import { getUsers } from "./slices/postSlice";
import { getCommunities } from "./slices/communitySlice";
import { useEffect } from "react";
import { getRankings,setRanking } from "./slices/leaderboardSlice";

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
     let users = [];
     dispatch(getUsers()).then((action)=>{
      users = [...action.payload.users]
     })
     dispatch(getCommunities())
     dispatch(getRankings()).then((action)=>{
      const data = action.payload?.filter(element => {
          const user = users?.find(ele => ele._id === element._id);
          return!!user?.username;
      });
      dispatch(setRanking(data))
    })
  },[dispatch])

  return (
    <>
      <LoadingPage />
      <Router>
        <Header />
        <UserRoutes />
        <BottomNavTabs/>
      </Router>
    </>
  );
}

export default App;
