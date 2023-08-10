import express from 'express';

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

export default router;
