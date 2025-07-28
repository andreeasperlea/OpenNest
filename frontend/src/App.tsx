import { useEffect } from 'react';
import { useAuthStore } from './stores/authStore';
import LoginSignup from "./Components/LoginSignup/LoginSignup";
import Dashboard from "./Components/Dashboard";
import {Route, BrowserRouter, Routes} from "react-router-dom";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;

