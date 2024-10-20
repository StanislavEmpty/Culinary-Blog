import './App.css';
import Layout from "./layout/Layout";
import React, {useEffect} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import HomePage from "./components/HomePage";
import NotExistPage from "./components/NotExistPage";
import RecipeBlogPage from "./components/RecipeBlogPage";
import Login from "./components/Auth/Login";
import RegistrationForm from "./components/Auth/RegistrationForm";
import MyPostsPage from "./components/Post/MyPostsPage";
import CreatePostPage from "./components/Post/CreatePostPage";
import EditPostPage from "./components/Post/EditPostPage";
import ReadPostPage from "./components/Post/ReadPostPage";

function App() {
    const [username, setUsername] = React.useState(
        localStorage.getItem('username')
            ? localStorage.getItem('username')
            : '');
    const [userRole, setUserRole] = React.useState(
        localStorage.getItem('role')
            ? localStorage.getItem('role')
            : '');
    const navigate = useNavigate();

    const logoutHandler = () => {
        setUsername(null);
        setUserRole(null);
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        navigate('/sign-in');
    }
  return (
    <div className="App">
        <Routes>
            <Route element={<ProtectedRoute isAllowed={!username} redirectPath={"/"}/>}>
                <Route path="sign-in" element={<Login/>}/>
                <Route path="sign-up" element={<RegistrationForm/>}/>
            </Route>
            <Route element={
                <Layout username={username} userRole={userRole} logoutHandler={logoutHandler}>
                    <ProtectedRoute isAllowed={!!username}/>
                </Layout>}>

                <Route path="" element={<HomePage/>}/>

                <Route path="my-posts" element={<MyPostsPage />}/>
                <Route path="/post/create" element={<CreatePostPage />}/>
                <Route path="/post/edit/:id" element={<EditPostPage />}/>
                <Route path="/post/:id" element={<ReadPostPage />}/>

            </Route>
            <Route path="*" element={<NotExistPage/>}/>
        </Routes>
    </div>
  );
}

export default App;
