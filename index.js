const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const connectMongoDB = require('./connection');

connectMongoDB();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use('/', express.static(path.join(__dirname, '/public')));

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor en el puerto ${port}`);
});