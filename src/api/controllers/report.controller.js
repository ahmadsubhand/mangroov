import * as services from "../services/report.service.js";
import customError from "../utils/customError.js";

export const createReport = async (req, res, next) => {
    try {
        if (!req.file) {
            throw new customError("Please upload the report image", 400)
        }
        const photo = req.file;
        const userId = req.user.id;
        const { description, latitude, longitude } = req.body;
        const data = await services.createReport(userId, photo, description, parseFloat(latitude), parseFloat(longitude))
        res.status(201).json(data);
    } catch(err) {
        console.log("Error in the createReport controller");
        next(err);
    }
}

export const getAllReports = async (req, res, next) => {
    try {
        const { status, classification } = req.query;
        const data = await services.getAllReports(status, classification);
        res.status(200).json(data);
    } catch(err) {
        console.log("Error in the getAllReports controller");
        next(err);
    }
}

export const updateReportStatus = async (req, res, next) => {
    try {
        const reportId = parseInt(req.params.reportId);
        const { status } = req.body;
        const data = await services.updateReportStatus(reportId, status);
        res.status(200).json(data);
    } catch(err) {
        console.log("Error in the updateReportStatus controller");
        next(err);
    }
}