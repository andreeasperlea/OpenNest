import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginSignup from "./Components/LoginSignup/LoginSignup";
import Dashboard from './Components/Dashboard';

function App(){
    return(
        <Router>
            <Routes>
                <Route path='/' element={<LoginSignup/>}></Route>
                <Route path='/' element={<Dashboard/>}></Route>
            </Routes>
        </Router>
    );
}

export default App;
