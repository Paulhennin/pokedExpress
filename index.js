require('dotenv').config();

const PORT = process.env.PORT || 3000;

const express = require('express');
const router = require('./app/router');

const app = express();

app.set('view engine', 'ejs');
app.set('views','app/views');

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

const session = require('express-session');
app.use(session({
    saveUninitialized : true,
    resave: true,
    secret: '123456'
}));

app.use(router);

app.listen(PORT, () => {
    console.info(`Server listening on port ${PORT}`);
});
