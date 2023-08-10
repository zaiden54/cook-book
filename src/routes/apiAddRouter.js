/* eslint-disable no-await-in-loop */
import express from 'express';
import {
  Recipe, Country, Category, Ingredient, RecipeIngredient, RecipeUser,
} from '../../db/models';

const router = express.Router();

router.get('/recipe', async (req, res) => {
  try {
    let arr = [];
    for (let i = 0; i < 12; i += 1) {
      arr.push(fetch('http://www.themealdb.com/api/json/v1/1/random.php'));
    }
    arr = (await Promise.allSettled(arr)).filter((el) => el.status === 'fulfilled');
    console.log('Array====', arr);
    arr = arr.map(((el) => el.value.json()));
    arr = (await Promise.allSettled(arr)).filter((el) => el.status === 'fulfilled');
    console.log('Array====', arr);
    arr = arr.map(((el) => el.value.meals[0]));
    console.log('Array====', arr);
    console.log('Arr======', arr.length);
    const set = [...new Set(arr)];
    console.log('Set=====', set.length);
    res.json(arr);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post('/recipe/add', async (req, res) => {
  try {
  // console.log('REQ.BODY-------', req.body);
    const country = await Country.findOne({
      where: { name: req.body.strArea },
    });
    const category = await Category.findOne({
      where: { title: req.body.strCategory },
    });

    // создаем новый рецепт
    const [recipe, createdRecipe] = await Recipe.findOrCreate({
      where: { title: req.body.strMeal },
      defaults: {
        title: req.body.strMeal,
        image: req.body.strMealThumb,
        instructions: req.body.strInstructions,
        catId: category.id,
        coutryId: country.id,
      },
    });
    // console.log(createdRecipe);

    // Создаем связи рецепт-ингредиенты
    if (createdRecipe) {
      const keys = Object.keys(req.body);
      for (let i = 0; i < keys.length; i += 1) {
        if (keys[i].startsWith('strIngredient') && req.body[keys[i]]) {
        // console.log('KEY ======', keys[i], 'ING======', req.body[keys[i]]);
          const [ingredient, createdIngredient] = await Ingredient.findOrCreate({
            where: { name: req.body[keys[i]] },
            defaults: {
              name: req.body[keys[i]],
            },
          });
          RecipeIngredient.findOrCreate({
            where: { recipeId: recipe.id, ingredientId: ingredient.id },
            defaults: {
              recipeId: recipe.id,
              ingredientId: ingredient.id,
            },
          });
        // console.log(ingredient.name, ingredient.id, createdIngredient);
        }
      }
    }

    // console.log(req.session.user);
    const [userRec, userRecCreated] = await RecipeUser.findOrCreate({
      where: { recipeId: recipe.id, userId: req.session.user.id },
      defaults: {
        recipeId: recipe.id,
        userId: req.session.user.id,
      },
    });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

export default router;
