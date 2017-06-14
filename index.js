// yeah, let's start with that :)
function die(msg, code) {
    console.log(msg);
    if (code === undefined) {
        code = -1;
    }

    process.exit(code);
}

// input
const argv = require('minimist')(process.argv.slice(2));
const AUTHORIZATION_URL = argv.authorization_url || die("Missing 'authorization_url' argument.");
const TOKEN_URL = argv.token_url || die("Missing 'token_url' argument.");
const TYPEFORM_API_URL = argv.typeform_api_url || die("Missing 'typeform_api_url' argument.");
const CLIENT_ID = argv.client_id || die("Missing 'client_id' argument.");
const CLIENT_SECRET = argv.client_secret || die("Missing 'client_secret' argument.");

const MY_HOST = '0.0.0.0';
const MY_PORT = process.env.PORT || 3000;
const MY_ADDR = `${MY_HOST}:${MY_PORT}`
const CALLBACK_URL = `http://${MY_ADDR}/callback`;


// import express
const url = require('url');
const express = require('express');
const session = require('express-session')({
    secret: 'top_secret',
    resave: true,
    saveUninitialized: true,
})


// import passport library
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');

console.log(AUTHORIZATION_URL);
console.log(TOKEN_URL);
// setup passport
passport.use(new OAuth2Strategy({
        authorizationURL: AUTHORIZATION_URL,
        tokenURL: TOKEN_URL,
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, cb) => {
        console.log(accessToken, refreshToken, profile);
        cb(null, {"access_token": accessToken});
    }
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));


// initialize app
const app = express();
const handlers = new (require('./handlers'))(TYPEFORM_API_URL);

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

const authenticator = passport.authenticate('oauth2', {
    failureRedirect: '/login',
    successReturnToOrRedirect: '/'
})

const require_authentication = function(req, res, next) {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.url;
        return res.redirect('/login');
    }

    next();
}

// setup handlers
app.get('/login', authenticator);
app.get('/callback', authenticator);
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

app.get('/', handlers.indexHandler);
app.get('/results/:id', require_authentication, handlers.displayResultsHandler);

app.listen(MY_PORT, MY_HOST, function () {
    console.log(`Running on http://${MY_ADDR}`);
})