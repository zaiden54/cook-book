import express from 'express';
import { Recipe, User } from '../../db/models';

const profileRouter = express.Router();

profileRouter.get('/', async (req, res) => {
  const myrecipes = await Recipe.findAll({
    include: [
      {
        model: User,
        as: 'likedBy',
        where: { id: req.session.user.id },
      },
    ],
  });
  res.render('Layout', { myrecipes });
});

export default profileRouter;
