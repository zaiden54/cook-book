export const authMiddleware = (req, res, next) => {
  if (req.session.user) {
    console.log('Вы уже вошли!');
    res.redirect('/');
    return;
  }
  next();
};

export const apiProtectionMiddleware = (req, res, next) => {
  if (!req.session.user) {
    console.log('Вы не авторизованы');
    res.redirect('/auth/login');
    return res.status(403).json({ message: 'Вы не авторизированны' });
  }
  return next();
};
