var express = require('express');
var router = express.Router();
var userHelpers = require('../helpers/user-helpers')
var adminHelpers = require('../helpers/admin-helpers')

verifyLogin = (req, res, next) => {

  if (req.session.loggedIn) {
    next()
  } else {
    res.redirect('/login')
  }


}
/* GET users listing. */
router.get('/', async function (req, res, next) {

  let courseList = await adminHelpers.getCourses()
  res.render('index', { layout: "main_layout.hbs", courseList })
});

router.get('/admin-login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/admin/dashboard')
  } else {
    res.render('admin/admin_login', { layout: "login.hbs", loginError: req.session.loginError });
    req.session.loginError = false
  }
});

router.get('/join', verifyLogin, (req, res) => {
  res.redirect('/user/dashboard')

})

router.get('/login', (req, res) => {

  res.render('user/user_login', { layout: "login.hbs" });

});

router.get('/register', (req, res) => {
  res.render('user/user_reg', { layout: "login.hbs" });
});




module.exports = router;
