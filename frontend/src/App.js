import './App.css';
import Layout from "./layout/Layout";
import React, {useEffect} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import HomePage from "./components/HomePage";
import NotExistPage from "./components/NotExistPage";
import Login from "./components/Auth/Login";
import RegistrationForm from "./components/Auth/RegistrationForm";
import MyPostsPage from "./components/Post/MyPostsPage";
import CreatePostPage from "./components/Post/CreatePostPage";
import EditPostPage from "./components/Post/EditPostPage";
import ReadPostPage from "./components/Post/ReadPostPage";
import FindPostsPage from "./components/Post/FindPostsPage";
import UserProfilePage from "./components/User/UserProfilePage";
import UserListPage from "./components/User/UserListPage";
import UserEditPage from "./components/User/UserEditPage";
import apiService from "./services/apiService";

function App() {
    const [username, setUsername] = React.useState(
        localStorage.getItem('username')
            ? localStorage.getItem('username')
            : '');

    const [userRole, setUserRole] = React.useState('');
    const [avatarUrl, setAvatarUrl] = React.useState('');

    const navigate = useNavigate();

    const logoutHandler = () => {
        setUsername(null);
        setUserRole(null);
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        navigate('/sign-in');
    }

    useEffect(() => {
        const getUser = async () =>
        {
            try
            {
                const respUser = await apiService.get('/api/users/get-current-user');
                console.log(respUser.data)
                setUserRole(respUser.data.role);
                setAvatarUrl(respUser.data.avatarUrl);
            }
            catch (e)
            {
                console.error(e)
            }
        };
        getUser();
    }, []);

  return (
    <div className="App">
        <Routes>
            <Route element={<ProtectedRoute isAllowed={!username} redirectPath={"/"}/>}>
                <Route path="sign-in" element={<Login/>}/>
                <Route path="sign-up" element={<RegistrationForm/>}/>
            </Route>
            <Route element={
                <Layout username={username} userRole={userRole} avatarUrl={avatarUrl} logoutHandler={logoutHandler}>
                    <ProtectedRoute isAllowed={!!username}/>
                </Layout>}>

                <Route path="" element={<HomePage/>}/>

                <Route path="my-posts" element={<MyPostsPage />}/>
                <Route path="/post/create" element={<CreatePostPage />}/>
                <Route path="/post/edit/:id" element={<EditPostPage />}/>
                <Route path="/post/:id" element={<ReadPostPage />}/>
                <Route path="/post/search/title/:title" element={<FindPostsPage />}/>
                <Route path="/post/search/duration/:duration" element={<FindPostsPage />}/>

                <Route path="/user/profile" element={<UserProfilePage />}/>

                <Route path="/user/" element={<UserListPage />}/>
                <Route path="/user/edit/:id" element={<UserEditPage />}/>


            </Route>
            <Route path="*" element={<NotExistPage/>}/>
        </Routes>
    </div>
  );
}

export default App;
