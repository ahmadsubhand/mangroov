import * as services from "../services/report.service.js";
import customError from "../utils/customError.js";

export const createReport = async (req, res, next) => {
    try {
        if (!req.file) {
            throw new customError("Please upload the report image", 400)
        }
        const photo = req.file;
        const userId = req.user.id;
        const { description, latitude, longitude, classification, status } = req.body;
        const data = await services.createReport(
            userId, photo, description, parseFloat(latitude), parseFloat(longitude), classification, status
        )
        res.status(201).json(data);
    } catch(err) {
        console.log("Error in the createReport controller");
        next(err);
    }
}