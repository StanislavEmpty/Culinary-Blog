import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {Card, CardContent, Typography, Button, Chip, Rating} from '@mui/material';

// Пример данных для постов
const recipes = [
    {
        title: 'Спагетти карбонара',
        description: 'A classic Italian pasta dish with eggs, cheese, pancetta, and pepper.',
        ingredients: ['Spaghetti', 'Eggs', 'Pancetta', 'Parmesan Cheese', 'Pepper'],
        instructions: 'Cook pasta. Fry pancetta. Mix eggs and cheese. Combine all ingredients with pepper.',
        image: 'https://avatars.dzeninfra.ru/get-zen_doc/5232843/pub_63f5c64ecdd48e720f4a3ff3_63f5c658d7f69a6cc17c174e/scale_1200', // Пример изображения
    },
    {
        title: 'Chicken Curry',
        description: 'A spicy, flavorful Indian curry made with chicken, tomatoes, and a variety of spices.',
        ingredients: ['Chicken', 'Onions', 'Garlic', 'Tomatoes', 'Spices', 'Coconut Milk'],
        instructions: 'Sauté onions and garlic. Add spices and chicken. Stir in tomatoes and coconut milk. Simmer until chicken is cooked.',
        image: 'https://avatars.mds.yandex.net/i?id=7a6684d961b4515903ded5e81ca4b97b_l-9212855-images-thumbs&n=13',
    },
    {
        title: 'Chocolate Cake',
        description: 'A rich and moist chocolate cake with creamy frosting.',
        ingredients: ['Flour', 'Cocoa Powder', 'Sugar', 'Eggs', 'Butter', 'Baking Powder'],
        instructions: 'Mix dry ingredients. Add eggs and butter. Bake in the oven at 350°F for 30 minutes. Frost with chocolate icing.',
        image: 'https://via.placeholder.com/300x300',
    }
];

// Карточка с постом рецепта
const RecipeCard = ({ recipe }) => (
    <Card style={{ marginBottom: '20px', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Row>
            <Col md={6}>
                <img
                    src={recipe.image}
                    alt={recipe.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderTopLeftRadius: '15px', borderBottomLeftRadius: '15px' }}
                />
            </Col>
            <Col md={6}>
                <CardContent style={{ padding: '20px' }}>
                    <Typography variant="h5" component="div" style={{ fontWeight: 'bold' }}>
                        {recipe.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ marginTop: '10px' }}>
                        {recipe.description}
                    </Typography>
                    <Typography variant="h6" component="div" style={{ marginTop: '15px' }}>
                        Ингредиенты:
                    </Typography>
                    <ul>
                        {recipe.ingredients.map((ingredient) => (
                            <Chip label={ingredient} className={"mx-2"}/>
                        ))}
                    </ul>
                    <Button variant="contained" color="primary" style={{ marginTop: '15px' }}>
                        Read More
                    </Button>
                </CardContent>
            </Col>
        </Row>
    </Card>
);

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
