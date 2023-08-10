import { Router } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../../db/models';
import mailer from '../middlewares/nodemailer';

const apiAuthRouter = Router();

apiAuthRouter.post('/signup', async (req, res) => {
  const { userName, email, password } = req.body;

  console.log(userName, password);

  if (!userName || !email || !password) {
    return res.status(400).json({ message: 'Заполните все поля' });
  }

  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      userName,
      // email,
      password: await bcrypt.hash(password, 10),
    },
  });

  if (!created) {
    return res.status(400).json({ message: 'Такая почта уже используется!!' });
  }

  req.session.user = {
    userName: user.userName,
    email: user.email,
    id: user.id,
  };

  const message = {
    to: req.body.email,
    subject:
        'Вы успешно зарегистрировались на нашем сайте Cook-book!',
    text: `Добро пожаловать на наш сайт! Мы очень надеемся, что вы сможете найти рецепт по своему вкусу!

      Данное письмо не требует ответа. `,
  };
  mailer(message);

  res.sendStatus(200);
});

apiAuthRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Заполните все поля' });
  }

  const user = await User.findOne({
    where: { email },
  });

  if (!user && !await bcrypt.compare(password, user.password)) {
    return res.status(400).json({ message: 'Неверная почта или пароль!' });
  }

  req.session.user = {
    userName: user.userName,
    email: user.email,
    id: user.id,
  };

  res.sendStatus(200);
});

apiAuthRouter.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('user_sid');
  res.sendStatus(200);
});

export default apiAuthRouter;
