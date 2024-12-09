export const ensureAuthenticated = (req, res, next) => {
  if(!req.session.user) {
    return res.redirect('/login');
  }
  next();
};


export const ensureGuest = (req, res, next) => {
  if(req.session.user) {
    return res.redirect('/home');
  }
  next();
};
  