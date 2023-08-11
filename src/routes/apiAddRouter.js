/* eslint-disable no-await-in-loop */
import express from 'express';
import axios from 'axios';

import {
  Recipe, Country, Category, Ingredient, RecipeIngredient, RecipeUser,
} from '../../db/models';

const apiAddRouter = express.Router();

apiAddRouter.get('/recipe/list/:id', async (req, res) => {
  const { id } = req.params;
  let str;
  switch (id) {
    case '0':
      str = 'http://www.themealdb.com/api/json/v1/1/random.php';
      break;
    case '1':
      str = 'http://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood';
      break;
    case '2':
      str = 'http://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian';
      break;
    default:
      res.sendStatus(501);
  }
  console.log(str);

  try {
    let arr = [];
    for (let i = 0; i < 12; i += 1) {
      arr.push(fetch(str));
    }
    arr = (await Promise.allSettled(arr)).filter((el) => el.status === 'fulfilled');
    arr = arr.map(((el) => el.value.json()));
    arr = (await Promise.allSettled(arr)).filter((el) => el.status === 'fulfilled');
    arr = arr.map(((el) => el.value.meals[0]));
    // удаление повторний
    const set = arr.filter((el, i, array) => {
      const temp = [];
      for (let j = 0; j < i; j += 1) {
        temp.push(array[j].idMeal);
      }
      if (temp.includes(el.idMeal)) return false;
      return true;
    });
    while (set.length < 12) {
      const newRecipe = (await ((await fetch(str)).json())).meals[0];
      const temp = [];
      set.forEach((el) => temp.push(el.idMeal));
      if (!temp.includes(newRecipe.idMeal)) {
        set.push(newRecipe);
        console.log('Подгрузка, idMeal = ', newRecipe.idMeal);
      }
    }
    res.json(set);
  } catch (err) {
    console.log('Error = ', err);
    res.sendStatus(500);
  }
});

apiAddRouter.post('/recipe/add', async (req, res) => {
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
        countryId: country.id,
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

apiAddRouter.get('/recipe', async (req, res) => {
  let arr = [];
  for (let i = 0; i < 12; i += 1) {
    arr.push(fetch('http://www.themealdb.com/api/json/v1/1/random.php'));
  }
  arr = await Promise.allSettled(arr);
  arr = arr.map(((el) => (el.status === 'fulfilled' ? el.value.json() : null)));
  arr = await Promise.allSettled(arr);
  arr = arr.map(((el) => el.value.meals[0]));
  res.json(arr);
});

apiAddRouter.get('/recipe/:idMeal', async (req, res) => {
  const { idMeal } = req.params;
  try {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
    res.json(response.data);
  } catch (error) {
    // console.error(error);
    res.sendStatus(500);
  }
});

export default apiAddRouter;
