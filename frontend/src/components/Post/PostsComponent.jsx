import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import RecipeCard from "./RecipeCard";

const PostsComponent = ({posts} ) => {

    return (
        <Container>
            <Row>
                {posts.map((post, index) => (
                    <Col key={index} xs={12}>
                        <RecipeCard recipe={post} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default PostsComponent;