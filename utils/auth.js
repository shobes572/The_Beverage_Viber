const withAuth = (req, res, next) => {
    // If the user is not logged in, redirect the request to the login route
    if (!req.session.logged_in) res.render('homepage', { session_data: req.session });
    else next();
  }
  
  module.exports = withAuth;