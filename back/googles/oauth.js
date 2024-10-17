module.exports = function(){
    const passport = require("passport");
    const googleStrategy = require("passport-google-oauth20").Strategy;
    const googleInfo = require("./google.json");
    const db = require("../sql/mysql.js");

    passport.serializeUser(function(email, done){
        done(null, email);
    })

    passport.deserializeUser(function(email, done){
        done(null, email)
    })

    passport.use(new googleStrategy({
        clientID: googleInfo.web.client_id,
        clientSecret: googleInfo.web.client_secret,
        callbackURL: googleInfo.web.redirect_uris[0]
    },
    function(accessToken, refreshToken, profile, done){
        let email = profile.emails[0].value;
        db.query("SELECT EXISTS (SELECT * FROM googles WHERE email=? limit 1) AS success", [email], function(error, result){
            if(result[0].success){
                done(null, email);
            }
            else{
                done(null, false);
            }
        })
    }
    ))

    return passport;
}