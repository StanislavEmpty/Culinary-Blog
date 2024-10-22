import React, {useState} from "react";
import RecipeBlogPage from "./Post/RecipeBlogPage";
import SearchPostModal from "./small-components/SearchPostModal";
import SearchButton from "./small-components/SearchButton";

const HomePage = () => {

    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <div>
                <SearchButton onClick={() => setOpenModal(true)} />
                <SearchPostModal open={openModal} handleClose={() => setOpenModal(false)}/>
            </div>
            <RecipeBlogPage/>
        </>
    );
};

export default HomePage;