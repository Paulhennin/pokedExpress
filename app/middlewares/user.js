const userMiddleware = (req, res, next) => {
    if(req.session.user) {
      res.locals.user = req.session.user;
    } else {
      res.locals.user = false;
      return res.redirect('/signin');
    }
  
    next();
  };
  
  
  module.exports = userMiddleware;