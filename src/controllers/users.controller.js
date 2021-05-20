const usersCtrl ={};

const passport = require('passport');

const User = require('../models/User');

//Sign Up
usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};

usersCtrl.signup = async (req, res) => {
    const errors = [];
    const {name, email, password , confirm_password} = req.body; 
    if (password != confirm_password){
        errors.push({text: 'Password do not match.'});
    };
    if(password.length < 4){
        errors.push({text:'Passwords must be at least 4 characters.'})
    };
    if(errors.length > 0){
        res.render('users/signup', {
            errors, 
            name, 
            email, 
            password, 
            confirm_password
        });
        
        }else{
            const emailUser = await User.findOne({email:email});
            if(emailUser){
                errors.push({text: 'The email is already in use.'});
                res.render('users/signup', {
                    errors,
                    name, 
                    email, 
                    password, 
                    confirm_password
                });
            }else{
                const newUser = new User({name, email, password});
                newUser.password = await newUser.encryptPassword(password);
                await newUser.save();
                req.flash('success_msg', 'You are been register successfully');
                res.redirect('/users/signin');
            }
        }
    };

//Sign In
usersCtrl.renderSigninForm = (req, res) => {
    res.render('users/signin');
};

usersCtrl.signin = passport.authenticate('local', {
    failureRedirect:'/users/signin',
    successRedirect:'/notes',
    failureFlash: true
});

//Log Out
usersCtrl.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out now.');
    res.redirect('/users/signin');
};

module.exports = usersCtrl;