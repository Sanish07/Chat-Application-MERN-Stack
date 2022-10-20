const http = require('http');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();  //Importing Dependencies

const routesAuth = require("./routes/AuthRoutes"); //Importing Routes auth config file.

const PORT = process.env.PORT || process.env.APP_PORT; 
//This line would tell the hosting environment, on which port to listen the request, in order to start the server. L - Port Provided by Hosting Env. or R - Port defined by us in .env file(if application is not hosted/deployed).

const app = express();
app.use(express.json()); //To allow the json files from DB to communicate with our backend(express server).
app.use(cors());

//Registering the routes
app.use('/app/auth', routesAuth);

//Env var syntax : DB_URI=mongodb+srv://<uname>:<pwd>@cluster0.43ojvwx.mongodb.net/<DBname>?retryWrites=true&w=majority

const server = http.createServer(app);

mongoose.connect(process.env.DB_URI).then(()=>{
    server.listen(PORT, ()=>{ //In order to start the server only when database is connected.
        console.log("Database is connected!");
        console.log(`The Chat Application is running on PORT ${PORT}`);
    });
}).catch((error)=>{
    console.log("Unable to connect to database.");
    console.error(error);
});

