const express = require('express');

const router = require('./routes');
const admin = require('./adminRoutes');
const models = require('./models/index');

const session = require('express-session');
const cookieParser = require('cookie-parser');

const passport = require('./passport-config');
const app = express();

app.set('view-engine', 'ejs');

const checkAuth = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }

    res.redirect('/admin');
}


//Middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: 'secret' }));




app.use(passport.initialize());
app.use(passport.session());





//Routes
app.use('/', router )
app.use('/admin', checkAuth, admin)





const port = 8080;





models.db.sync({
 force: false
})
.then(() =>{
    app.listen(port, () => {
        console.log(`Server was started on port ${port}`);
    });
})

