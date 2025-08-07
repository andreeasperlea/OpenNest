import { useEffect } from 'react';
import { useAuthStore } from './stores/authStore';
import LoginSignup from "./Components/LoginSignup/LoginSignup";
import Dashboard from "./Components/Dashboard";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import { Repository } from "./Components/Repository";
import IssueDetails from "./Components/IssueDetails";
import CommitDetails from "./Components/CommitDetails";


function App() {
  const { fetchUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, []);

  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/repository/:id" element={<Repository />} />
          <Route path="/issues/:issueId" element={<IssueDetails/>}/>
          <Route path="/commits/:commitId" element={<CommitDetails/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

