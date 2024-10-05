import './App.css';
import Layout from "./layout/Layout";
import React from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import HomePage from "./components/HomePage";
import NotExistPage from "./components/NotExistPage";
import RecipeBlogPage from "./components/RecipeBlogPage";
import Login from "./components/Auth/Login";

function App() {
    const [username, setUsername] = React.useState(localStorage.getItem('username'));
    const [userRole, setUserRole] = React.useState(localStorage.getItem('role'));
    const navigate = useNavigate();

    const logoutHandler = () => {
        setUsername(null);
        setUserRole(null);
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        navigate('/login');
    }
  return (
    <div className="App">
        <Routes>
            <Route element={<ProtectedRoute isAllowed={!username} redirectPath={"/"}/>}>
                <Route path="login" element={<Login/>}/>
            </Route>
            <Route element={
                <Layout username={username} userRole={userRole} logoutHandler={logoutHandler}>
                    <ProtectedRoute isAllowed={!!username}/>
                </Layout>}>

                <Route path="" element={<HomePage/>}/>
                <Route path="blog" element={<RecipeBlogPage/>}/>
            </Route>
            <Route path="*" element={<NotExistPage/>}/>
        </Routes>
    </div>
  );
}

export default App;
