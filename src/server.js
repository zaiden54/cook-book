import path from 'path';
import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import store from 'session-file-store';
import jsxRender from './utils/jsxRender';
import indexRouter from './routes/indexRouter';
import apiAddRouter from './routes/apiAddRouter';
import authRouter from './routes/authRouter';
import apiAuthRouter from './routes/apiAuthRouter';
import { authMiddleware } from './middlewares/apiAuthMiddleware';
import profileRouter from './routes/profileRouter';
import apiProfileRouter from './routes/apiProfileRouter';

require('dotenv').config();

const PORT = process.env.SERVER_PORT || 3000;
const app = express();
const FileStore = store(session);

const sessionConfig = {
  name: 'user_sid',
  secret: process.env.SESSION_SECRET ?? 'test',
  resave: true,
  store: new FileStore(),
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
};

app.engine('jsx', jsxRender);
app.set('view engine', 'jsx');
app.set('views', path.join(__dirname, 'components'));

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session(sessionConfig));

app.use((req, res, next) => {
  res.locals.path = req.originalUrl;
  next();
});

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

app.use('/', indexRouter);
app.use('/api', apiAddRouter);
app.use('/auth', authMiddleware, authRouter);
app.use('/api/auth', apiAuthRouter);
app.use('/profile', profileRouter);
app.use('/api/profile', apiProfileRouter)

app.listen(PORT, () => console.log(`App has started on port ${PORT}`));
