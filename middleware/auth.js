module.exports = {
    authenticator: (req, res, next) => {
      if (req.isAuthenticated()) {
        return next()
      }
      req.flash('warning_msg','Please login before using the platform.')
      res.redirect('/users/login')
    }
  }