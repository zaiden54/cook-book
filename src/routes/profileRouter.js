import express from 'express';
import { Recipe, User, RecipeUser } from '../../db/models';


const profileRouter = express.Router();

profileRouter.get('/', async (req, res) => {
    const myrecipes = await Recipe.findAll({
      include: [
        {
          model: User,
          as: 'likedBy',
        },
      ],
    });
    res.render('Layout', { myrecipes });
  });

export default profileRouter;

