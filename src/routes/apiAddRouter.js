/* eslint-disable no-await-in-loop */
import express from 'express';
import axios from 'axios';

import {
  Recipe, Country, Category, Ingredient, RecipeIngredient, RecipeUser,
} from '../../db/models';

const apiAddRouter = express.Router();

apiAddRouter.get('/categories', async (req, res) => {
  try {
    // const categories = await (await fetch('http://www.themealdb.com/api/json/v1/1/list.php?c=list')).json();
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    console.log('Categories Error ===', err);
  }
});
apiAddRouter.get('/countries', async (req, res) => {
  try {
    // const countries = await (await fetch('http://www.themealdb.com/api/json/v1/1/list.php?a=list')).json();
    const countries = await Country.findAll();
    res.json(countries);
  } catch (err) {
    console.log('Countries Error ===', err);
  }
});

apiAddRouter.get('/recipes/:type/:name/:page', async (req, res) => {
  try {
    const { type, name, page } = req.params;
    console.log('Type=', type, 'Name=', name, 'page=', page);
    // const { type, name } = req.params;
    let arr = [];
    let str;
    let set = [];
    const idMeals = [];
    // Создаем массив id блюд
    if (type === 'all') {
      str = 'http://www.themealdb.com/api/json/v1/1/random.php';
    } else if (type === 'categories') {
      str = `http://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`;
    } else if (type === 'countries') {
      str = `http://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`;
    } else res.sendStatus(504);
    if (str !== 'http://www.themealdb.com/api/json/v1/1/random.php') {
      const recipes = (await (await fetch(str)).json()).meals;
      recipes.forEach((recipe) => idMeals.push(recipe.idMeal));
    }
    // console.log('IdMeals == ', idMeals);
    // Пытаемся получить 12 блюд
    if (type === 'all') {
      for (let i = 0; i < 12; i += 1) {
        arr.push(fetch(str));
      }
    } else {
      for (let i = 0; i < 12 && i < idMeals.length; i += 1) {
        str = `http://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeals[i]}`;
        arr.push(fetch(str));
      }
    }
    arr = (await Promise.allSettled(arr)).filter((el) => el.status === 'fulfilled');
    arr = arr.map(((el) => el.value.json()));
    arr = (await Promise.allSettled(arr)).filter((el) => el.status === 'fulfilled');
    arr = arr.map(((el) => el.value.meals[0]));
    // удаление повторений
    set = arr.filter((el, i, array) => {
      const temp = [];
      for (let j = 0; j < i; j += 1) {
        temp.push(array[j].idMeal);
      }
      if (temp.includes(el.idMeal)) return false;
      return true;
    });
    // Если что-то не догрузилось, добираем остатки
    let i = 0;
    while (set.length < 12 && i < 24) {
      if (!idMeals || (idMeals && i < idMeals.length)) {
        const newRecipe = (await ((await fetch(str)).json())).meals[0];
        const temp = [];
        set.forEach((el) => temp.push(el.idMeal));
        if (!temp.includes(newRecipe.idMeal)) {
          set.push(newRecipe);
          // console.log('Подгрузка, type = ', type, 'idMeal = ', newRecipe.idMeal);
        }
      }
      i += 1;
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
        idMeal: req.body.idMeal,
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
