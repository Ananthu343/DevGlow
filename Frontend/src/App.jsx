import { BrowserRouter as Router } from "react-router-dom"
import UserRoutes from "./routes/userRoutes";
import Header from "./components/Header";
import LoadingPage from "./components/LoadingPage";
import BottomNavTabs from "./components/BottomNavTabs";

function App() {

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
