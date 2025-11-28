import path from "node:path";

import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import { v6 } from "uuid";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.errors";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(process.cwd(), "uploads"));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = v6();
        const ext = path.extname(file.originalname);
        cb(null, `${uniqueSuffix}${ext}`);
    },
});

const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
) => {
    const allowedExtensions = /jpeg|jpg|png|gif/;
    const extname = allowedExtensions.test(
        path.extname(file.originalname).toLowerCase(),
    );
    const mimetype = allowedExtensions.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(
            new ApiError(
                "Only images are allowed",
                StatusCodesEnum.BAD_REQUEST,
            ),
        );
    }
};

export const upload = multer({
    storage: storage,
    limits: { fieldSize: 5 * 1024 * 1024 },
    fileFilter: fileFilter,
});
