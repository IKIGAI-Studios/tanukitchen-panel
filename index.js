const express = require('express');
const path = require('path');
const cors = require('cors');
const connectMongoDB = require('./connection');
const main_routes = require('./routes/main_routes');
const bin_routes = require('./routes/bin_routes');
const bd_modules_routes = require('./routes/bd_modules_routes');
const dotenv = require('dotenv');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

connectMongoDB();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
app.use(session({
  secret: process.env.SECRET_KEY_SESSION,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000 }, // En producción debería ser true para usar HTTPS
}));
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/', main_routes);
app.use('/api/bin/', bin_routes);
app.use('/api/modules/', bd_modules_routes);
app.use("/img", express.static(path.join(__dirname, 'src/img')));
app.use("/fonts", express.static(path.join(__dirname, 'src/fonts')));
app.use("/js", express.static(path.join(__dirname, 'src/js')));
app.set('view engine', 'ejs');
app.use("/scss", express.static(path.join(__dirname, 'src/assets/scss')));


dotenv.config();

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor en el puerto ${port}`);
});