const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//Require your User Model here!
const UserModel = require("../models/user")
// configuring Passport!
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  async function(accessToken, refreshToken, profile, cb) {
    // a user has logged in via OAuth!
    // refer to the lesson plan from earlier today in order to set this up
    try{
    // Has the user logged in before?
    let user = await UserModel.findOne({googleId: profile.id});
    // if user model finds anything we pass that to the next passport function
    if(user) return cb(null, user);
    console.log(profile)
    // if the user has not logged in before we will create the user in the database
    // the properties we want should match up with the schema
    user = await UserModel.create({
      name: profile.displayName,
      googleId: profile.id,
      avatar: profile.photos[0].value
    })
    // pass the new users information to the next piece of middleware
    cb(null, user);
    }catch(err){
      cb(err)
    }
  }
));

// This will run after the verify callback, this function adds our user._id to our session cookie
// it accepts the userDoc passed in from cb(null, user) above
passport.serializeUser(function(user, cb) {
  cb(null, user._id);
});

// This will run everytime there is an HTTP request from an existing user that logs in
// opens session cookie, grabs the user id, searches the database for that user
// and then assigns that userDoc to req.user, which will now be available in every controller function
passport.deserializeUser(function(userId, cb) {

  // Find your User, using your model, and then call cb(err, whateverYourUserIsCalled)
  UserModel.findById(userId)
            .then(function(userDoc){
              cb(null, userDoc)  // this part assigns userDoc to req.user
            }).catch(err => {
              cb(err)
            })
  // When you call this cb function passport assigns the user document to req.user, which will 
  // be availible in every Single controller function, so you always know the logged in user

});



