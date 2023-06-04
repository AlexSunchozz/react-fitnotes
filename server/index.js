require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path');
const bodyParser = require('body-parser'); //1

const PORT = process.env.PORT || 7001;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use(bodyParser.json()); //2
app.use('/api', router);

// Обработка ошибок, последний Middleware
app.use(errorHandler);
const start = async () => {
    try {
        await sequelize.authenticate(); // устанавливается подключение к БД
        await sequelize.sync({ alter: true }); // сверяет состояние БД со схемой данных
        app.listen(PORT, () => console.log(`server start on ${PORT}`));
    } catch (e) {
        console.log(e)
    }
}
start();

