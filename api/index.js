const express = require('express');
const morgan = require("morgan");
const errorHandler = require('./src/middlewares/errorHandler');
const setHeaders = require('./src/middlewares/setHeaders');
const app = express();
const github = require('./src/routes/github')
const PORT = 3001;

app.use(setHeaders)
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));
app.use(errorHandler);

app.use('/', github)


app.listen(PORT, ()=>{
    console.log(`Server is listening in Port ${PORT}`)
})