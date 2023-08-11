export const authMiddleware = (req, res, next) => {
  if (req.session.user) {
    console.log('Вы уже вошли!');
    res.redirect('/');
    return;
  }
  next();
};
