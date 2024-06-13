import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import UserRoutes from './routes/Routes';
import Header from './components/Header';
import LoadingPage from './components/LoadingPage';
import BottomNavTabs from './components/BottomNavTabs';
import { getUsers, getComments } from './slices/postSlice';
import { getCommunities } from './slices/communitySlice';
import { getRankings, setRanking, getBadges } from './slices/leaderboardSlice';


function App() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    dispatch(getUsers()).then((action) => {
      setUsers(action?.payload?.users);
    });
    dispatch(getCommunities());
    dispatch(getBadges());
    dispatch(getComments())
  }, [dispatch]);

  useEffect(() => {
    if (users?.length > 0) {
      dispatch(getRankings()).then((action) => {
        const data = action.payload?.filter((element) => {
          // eslint-disable-next-line no-underscore-dangle
          const user = users.find((ele) => ele._id === element._id);
          return !!user?.username;
        });
        dispatch(setRanking(data));
      });
    }
  }, [users, dispatch]);

  return (
    <>
      <LoadingPage />
      <Router>
        <Header />
        <UserRoutes />
        <BottomNavTabs />
      </Router>
    </>
  );
}

export default App;
