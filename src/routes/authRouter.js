import { Router } from 'express';

const authRouter = Router();

authRouter.get('/login', (req, res) => {
  res.render('Layout', {});
});

authRouter.get('/signup', (req, res) => {
  res.render('Layout', {});
});

export default authRouter;
