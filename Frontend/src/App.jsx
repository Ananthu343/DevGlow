import {BrowserRouter as Router} from "react-router-dom"
import UserRoutes from "./routes/UserRoutes";
import Header from "./components/Header";
import LoadingPage from "./components/LoadingPage";


function App() {
 
  return (
    <>
      <LoadingPage/>
      <Router>
      <Header/>
        <UserRoutes/>
     </Router>
    </>
  );
}

export default App;
