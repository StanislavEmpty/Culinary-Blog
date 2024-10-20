import React, {useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {Card, CardContent, Typography, Button, Chip, IconButton} from '@mui/material';
import {ThumbDown, ThumbUp, Timer} from "@mui/icons-material";

// Пример данных для постов
const recipes = [
    {
        title: 'Спагетти карбонара',
        stage: ['A classic Italian pasta dish with eggs, cheese, pancetta, and pepper.'],
        ingredients: ['Spaghetti', 'Eggs', 'Pancetta', 'Parmesan Cheese', 'Pepper'],
        durationCookingMinutes: 30,
        instructions: 'Cook pasta. Fry pancetta. Mix eggs and cheese. Combine all ingredients with pepper.',
        imageUrl: 'https://avatars.dzeninfra.ru/get-zen_doc/5232843/pub_63f5c64ecdd48e720f4a3ff3_63f5c658d7f69a6cc17c174e/scale_1200',
        likes: 20,
        dislikes: 2,
    },
    {
        title: 'Chicken Curry',
        stage: ['A spicy, flavorful Indian curry made with chicken, tomatoes, and a variety of spices.'],
        ingredients: ['Chicken', 'Onions', 'Garlic', 'Tomatoes', 'Spices', 'Coconut Milk'],
        durationCookingMinutes: 120,
        instructions: 'Sauté onions and garlic. Add spices and chicken. Stir in tomatoes and coconut milk. Simmer until chicken is cooked.',
        imageUrl: 'https://avatars.mds.yandex.net/i?id=7a6684d961b4515903ded5e81ca4b97b_l-9212855-images-thumbs&n=13',
        likes: 20,
        dislikes: 2,
    },
    {
        title: 'Chocolate Cake',
        stage: ['A rich and moist chocolate cake with creamy frosting.'],
        ingredients: ['Flour', 'Cocoa Powder', 'Sugar', 'Eggs', 'Butter', 'Baking Powder'],
        durationCookingMinutes: 5,
        instructions: 'Mix dry ingredients. Add eggs and butter. Bake in the oven at 350°F for 30 minutes. Frost with chocolate icing.',
        imageUrl: 'https://via.placeholder.com/300x300',
        likes: 20,
        dislikes: 2,
    }
];

// Карточка с постом рецепта
const RecipeCard = ({ recipe }) => {
    const [likes, setLikes] = useState(recipe.likes);
    const [dislikes, setDislikes] = useState(recipe.dislikes);

    const handleLike = () => {
        setLikes(likes + 1);
    };

    const handleDislike = () => {
        setDislikes(dislikes + 1);
    };

    return (
        <Card style={{ marginBottom: '20px', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Row>
                <Col md={6}>
                    <img
                        src={recipe.imageUrl}
                        alt={recipe.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderTopLeftRadius: '15px', borderBottomLeftRadius: '15px' }}
                    />
                </Col>
                <Col md={6}>
                    <CardContent style={{ padding: '20px' }}>
                        <Typography variant="h5" component="div" style={{ fontWeight: 'bold' }}>
                            {recipe.title} <Timer/> <Chip label={recipe.durationCookingMinutes + "m"}/>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" style={{ marginTop: '10px' }}>
                            {recipe.stage[0]} <Chip label={"..."} className={"h3 fw-bold fw2-l"}/>
                        </Typography>
                        <Typography variant="h6" component="div" style={{ marginTop: '15px' }}>
                            Ингредиенты:
                        </Typography>
                        <ul>
                            {recipe.ingredients.map((ingredient, index) => (
                                <Chip key={index} label={ingredient} className={"mx-2"}/>
                            ))}
                        </ul>
                        <Button variant="contained" color="primary" style={{ marginTop: '15px' }}>
                            Read More
                        </Button>
                    </CardContent>
                    <div style={{ padding: '10px' }}>
                        <IconButton onClick={handleLike}>
                            <ThumbUp />
                        </IconButton>
                        <span className="mx-2">{likes}</span>
                        <IconButton onClick={handleDislike}>
                            <ThumbDown />
                        </IconButton>
                        <span className="mx-2">{dislikes}</span>
                    </div>
                </Col>
            </Row>
        </Card>
    );
};

// Главная страница блога
const RecipeBlogPage = () => (
    <Container>
        <Row>
            {recipes.map((recipe, index) => (
                <Col key={index} xs={12}>
                    <RecipeCard recipe={recipe} />
                </Col>
            ))}
        </Row>
    </Container>
);

export default RecipeBlogPage;
