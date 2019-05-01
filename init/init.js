const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: './env/.env'});

mongoose.connect(process.env.db_path, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
}).then(
    () => {
        console.log('Connected to the database successfully!')
    },
    err => {
        console.error('Failed to connect to the database with error:', err);
    }
);
