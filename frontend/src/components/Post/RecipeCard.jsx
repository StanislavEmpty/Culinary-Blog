// Карточка с постом рецепта
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import apiService from "../../services/apiService";
import {Button, Card, CardContent, Chip, IconButton, Typography} from "@mui/material";
import {Col, Row} from "react-bootstrap";
import {ThumbDown, ThumbUp, Timer} from "@mui/icons-material";

const RecipeCard = ({ recipe }) => {
    const navigate = useNavigate();
    const [likes, setLikes] = useState(recipe.likes);
    const [dislikes, setDislikes] = useState(recipe.dislikes);

    const handleLike = async () => {
        try {
            await apiService.get(`/api/posts/like/${recipe.id}`);
        }
        catch (e)
        {
            console.error(e)
        }
        setLikes(likes + 1);
    };

    const handleDislike = async () => {
        try {
            await apiService.get(`/api/posts/dislike/${recipe.id}`);
        } catch (e) {
            console.error(e)
        }
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
                            {recipe.stages[0].description || 'No stages'} <Chip label={"..."} className={"h3 fw-bold fw2-l"}/>
                        </Typography>
                        <Typography variant="h6" component="div" style={{ marginTop: '15px' }}>
                            Ингредиенты:
                        </Typography>
                        <ul>
                            {recipe.ingredients.map((ingredient) => (
                                <Chip key={ingredient.id} label={ingredient.name} className={"mx-2"}/>
                            ))}
                        </ul>
                        <Button variant="contained" color="primary" style={{ marginTop: '15px' }} onClick={() => navigate('/post/' + recipe.id)}>
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

export default RecipeCard;