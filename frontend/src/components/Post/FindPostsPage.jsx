import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import apiService from "../../services/apiService";
import PostsComponent from "./PostsComponent";
import SearchPostModal from "../small-components/SearchPostModal";
import SearchButton from "../small-components/SearchButton";

const FindPostsPage = () => {
    const { title, duration  } = useParams();
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const getData = async (url) => {
            try
            {
                const resp = await apiService.get(url);
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

        if(title)
        {
            getData('/api/posts/search-by-title/' + title).catch(e => console.error(e));
        }
        else if(duration)
        {
            getData('/api/posts/search-by-duration/' + duration).catch(e => console.error(e));
        }
        else
        {
            navigate(-1);
        }

    }, [title, duration]);

    return (
        <>
            <SearchButton onClick={() => setOpenModal(true)} />
            <SearchPostModal open={openModal} handleClose={() => setOpenModal(false)}/>
            {posts.length === 0 ? (<h2>Не найдено ни одно результата</h2>)
                : (<PostsComponent posts={posts}/>)}
        </>
    )
}

export default FindPostsPage;
