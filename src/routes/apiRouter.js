import express from 'express';
import recipe from '../../db/models/recipe';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ hello: 'world' });
});

router.get('/recipe', async (req, res) => {
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

router.post('/recipe/add', async (req, res) => {
  console.log('REQ.BODY-------', req.body);
  // await recipe.create({
  //   title: req.body.strMeal,
  //   imgage: req.body.strMealThimb,
  //   instructions: req.body.strInstructions,
  // });

  // const recipes = await recipe.findAll();
  // console.log(recipes);
});

export default router;
