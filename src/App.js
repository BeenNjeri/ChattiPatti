import './App.css';
import './style.css';
import { BrowserRouter,Navigate, Routes, Route } from "react-router-dom"
import Home from './Home';
import Register from './Register';
import Login from './Login';
import { useContext } from "react";
import { AuthContext} from "./AuthContext";


function App() {
    const { currentUser }  = useContext(AuthContext)
    const ProtectedRoute = ({ children }) => {
        if (!currentUser) {
            return <Navigate to="/login"/>
        }
        return children
    }
    return (
      <BrowserRouter>
            <Routes>
            <Route path="/">
                <Route index element={<ProtectedRoute>
                    <Home />
                </ProtectedRoute>} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>
        </Routes>
      </BrowserRouter>
     
  );
}

export default App;
