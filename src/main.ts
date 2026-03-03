import express from "express";
import mongoose from "mongoose";
import {apiRouter} from "./routers/api.router";
import {config} from "./config/config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", apiRouter);


const dbConnection = async () => {
    let dbCon = false;

    while (!dbCon) {
        try {
            console.log("Connecting to database...");
            await mongoose.connect(config.MONGO_URI);
            dbCon = true;
            console.log("MongoDB Connected!");
        } catch (error) {
            console.log(`MongoDB Connection Error: ${error}`);
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    }
}

const start = async () => {
    try {
        await dbConnection();
        app.listen(config.PORT, () => {
            console.log(`Server listening on port ${config.PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}


start();