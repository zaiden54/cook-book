import express from 'express';
import axios from 'axios';

const apiRouter = express.Router();

apiRouter.get('/recipe', async (req, res) => {
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

apiRouter.get('/recipe/:idMeal', async (req, res) => {
  const { idMeal } = req.params;
  try {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
    res.json(response.data);
  } catch (error) {
    // console.error(error);
    res.sendStatus(500);
  }

  // const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
});

export default apiRouter;
