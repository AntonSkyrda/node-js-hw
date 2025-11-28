/* eslint-disable no-console*/
import path from "node:path";

import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { config } from "./config/config";
import { ApiError } from "./errors/api.errors";
import { apiRouter } from "./routers/api.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/media", express.static(path.join(process.cwd(), "uploads")));

app.use("/", apiRouter);
app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message;

    res.status(status).json({ status, message });
});

process.on("uncaughtException", (err) => {
    console.log(`uncaughtException: ${err.message}`);
    process.exit(1);
});

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
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }
    }
};

const start = async () => {
    try {
        await dbConnection();
        app.listen(config.PORT, () => {
            console.log(`Server listening on port ${config.PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
