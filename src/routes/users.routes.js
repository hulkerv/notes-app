const {Router} = require('express');
const router = Router();

const {
    renderSignUpForm,
    signup, 
    renderSigninForm, 
    signin, 
    logout
} = require('../controllers/users.controller');

//Sign Up
router.get('/users/signup', renderSignUpForm);

router.post('/users/signup', signup);

//Sign In
router.get('/users/signin', renderSigninForm);

router.post('/users/signin', signin);

//Logout
router.get('/users/logout', logout)

module.exports = router;