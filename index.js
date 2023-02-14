const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const connectMongoDB = require('./connection');
const main_routes = require('./routes/main_routes');
const bin_routes = require('./routes/bin_routes');

connectMongoDB();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/', main_routes);
app.use('/api/bin/', bin_routes);
app.use("/img", express.static(path.join(__dirname, 'src/imgs')));
app.use("/fonts", express.static(path.join(__dirname, 'src/fonts')));
app.set('view engine', 'ejs');
app.use("/scss", express.static(path.join(__dirname, 'src/assets/scss')));

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor en el puerto ${port}`);
});