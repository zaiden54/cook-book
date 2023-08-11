import express from 'express';
import { RecipeUser, Recipe } from '../../db/models'; // чтобы связать пользователя с постами, тащим сюда еще юзера

const apiProfileRouter = express.Router();

apiProfileRouter.delete('/:id', async (req, res) => {
  try {
    await RecipeUser.destroy({
      where: {
        recipeId: req.params.id,
        userId: req.session.user.id,
      },
    });

    const hasLikes = (await RecipeUser.findAll({
      where: {
        recipeId: req.params.id,
      },
    })).length;

    if (!hasLikes) {
      await Recipe.destroy({
        where: {
          id: req.params.id,
        },
      });
    }
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

export default apiProfileRouter;
