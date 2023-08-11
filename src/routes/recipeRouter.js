import axios from 'axios';
import { Router } from 'express';

const recipeRouter = Router();

recipeRouter.get('/:idMeal', async (req, res) => {
  try {
    const { idMeal } = req.params;
    const response = await axios.get(`http://localhost:3000/api/recipe/${idMeal}`);
    res.render('Layout', { meal: response.data.meals[0] });
  } catch (error) {
    console.log(error);
  }
});

export default recipeRouter;
