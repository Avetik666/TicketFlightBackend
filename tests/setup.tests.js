const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: './env/.env'});

const testDBPath = process.env.db_path_test;
mongoose.connect(testDBPath, {
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

mongoose.Promise = global.Promise;
