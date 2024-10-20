import React, {useEffect, useState} from "react";
import {CircularProgress} from "@mui/material";
import apiService from "../services/apiService";
import RecipeBlogPage from "./RecipeBlogPage";

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const getPosts = async () =>
        {
            try
            {
                // const resp = await apiService.get('/api/posts');
                //setPosts(resp.data);
                setLoading(false);
            }
            catch (e) {
                setError(e);
                setLoading(false);
            }
        };
        getPosts().catch(error => console.log(error));
    }, []);

    return (
        <>
            {loading ? (
                <div className={"d-flex align-content-center"}>
                    <CircularProgress color="inherit"/>
                </div>
            ) : error ? (
                <h4 className="text-center">{error}</h4>
            ): (
                <RecipeBlogPage/>
            )}
        </>
    );
};

export default HomePage;