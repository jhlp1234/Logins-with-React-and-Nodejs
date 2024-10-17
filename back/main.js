const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const fileStore = require("session-file-store")(session);
const passport = require("passport");

const root = require("./routes/root.js");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
}))
app.use(session({
    name: "logined",
    secret: "aiuyiuyategiluyatrhiuaea",
    resave: true,
    saveUninitialized: false,
    store: new fileStore(),
    cookie: {
        httpOnly: true,
        sameSite: "lax"
    }
}))
app.use(passport.session());
app.use(passport.initialize());

app.use("/", root);
app.listen(5000, function(){
    console.log("Start");
})