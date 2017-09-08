var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');
var ProfileData = require('../models/profile');
var BehaviorData = require('../models/behavior');

// SignUp
router.get('/signup', function(req, res){
	res.render('signup');
});

// Login
router.get('/login', function(req, res){
	res.render('login');
});

// Profile Page
router.get('/profile', function(req, res){

	
	res.render('profile');
});

router.post('/signup', function(req, res){
	
	var username = req.body.username;
	var password = req.body.password;

	// validation of name and passwd
	
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		res.render('signup',{
			errors:errors
		});
	} else {
		var newUser = new User({
			username: username,
			password: password
		});

		User.createUser(newUser, function(err, user){
			if(err) {
				return res.send();
			
			}
			//res.json({ message: 'username already exists' });
				
			//console.log(user + " userlog ");
			
			
		//	console.log(req.user+ " sessionuser");
		//	console.log(req.passport.session.user) + "passportsession";
		});

		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('/users/login');
	}
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
		}
		

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
		global.usernameG = req.body.username;
		req.session.username = req.body.username;
		var action;
		//console.log(req.session.username);
		ProfileData.create({username:req.session.username,time:Date.now()},function (err){
			if(err) throw err;
			BehaviorData.getUserBehaviorsByUsername(req.session.username, function(err, profile){
				if(err) throw err;
				if(!profile){
					return done(null, false, {message: 'Unknown profile'});
				}
				action = profile
				});
			ProfileData.getUserTimeStampByUsername(req.session.username, function(err, profile){
				if(err) throw err;
				if(!profile){
					return done(null, false, {message: 'Unknown profile'});
				}
				//res.render("profile",{username:profile[0].username,time:profile});
				res.render("profile",{username:profile[0].username,time:profile,action:action});
			});
			
		//	res.redirect('/users/profile');
		})
    
	}
); 

/* router.get('/logout', function(req, res){
	req.logout();
  
	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
}); */

router.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/users/login');
      }
    });
  }
});

//BehavioralTracking

router.post('/BehavioralTracking', function(req, res, next) {
  
	//req.session.username = req.body.username;
	//console.log(req.body);
	//console.log(global.usernameG);
	//console.log(req.body.data);
	BehaviorData.create({username:global.usernameG, action:req.body},function (err){
		if(err) throw err;
		
	//	res.redirect('/users/profile');
	})

	
});	


module.exports = router;