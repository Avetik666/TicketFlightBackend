const express = require('express');

const app = express();

app.use(express.json());
app.use('/flight', require('./routes/flights.js'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});