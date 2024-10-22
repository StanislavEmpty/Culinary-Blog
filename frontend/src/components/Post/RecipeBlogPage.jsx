import React, {useEffect, useState} from 'react';
import apiService from "../../services/apiService";
import PostsComponent from "./PostsComponent";

// Главная страница блога
const RecipeBlogPage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try
            {
                const resp = await apiService.get('/api/posts');
                if(resp.status === 200)
                {
                    setPosts(resp.data)
                }
            }
            catch (e)
            {
                console.error('Error fetch. ' + e)
            }
        }
        getData().catch(e => console.error(e));
    }, []);



    return (
        <PostsComponent posts={posts}/>
    );
}

export default RecipeBlogPage;
