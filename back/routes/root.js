const express = require("express");
const router = express.Router();
const passport = require("../googles/oauth.js")();

const db = require("../sql/mysql.js");

router.post("/regist", function(req, res){
    let post = req.body;
    db.query("INSERT INTO locals (name, password) VALUES (?, ?)", [post.name, post.password], function(error, result){
        res.send(null);  
    })
})

router.post("/login", function(req, res){
    let post = req.body;
    db.query("SELECT EXISTS (SELECT * FROM locals WHERE name=? AND password=? LIMIT 1) AS success", [post.name, post.password], function(error, result){
        if(result[0].success){
            req.session.name = post.name;
        }
        res.send({
            success: result[0].success
        });
    })
})

router.get("/auth", passport.authenticate("google", {
    scope: ["profile", "email"], prompt: "select_account"
}))

router.get("/google", passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login"
}),
function(req, res){
    res.redirect("http://localhost:3000");
})

router.get("/users", function(req, res){
    res.send({
        googleUser: req.user,
        localUser: req.session.name
    })
})

router.get("/logout", function(req, res){
    req.session.destroy(function(){
        res.send(null);
    })
})

module.exports = router;