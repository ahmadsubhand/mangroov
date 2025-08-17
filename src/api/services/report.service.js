import dayjs from "dayjs";
import imagekit from "../utils/imagekit.js";
import prisma from "../utils/prisma.js";

export const createReport = async (userId, photo, description, latitude, longitude) => {
    try {
        const photoLink = await imagekit.upload({
            file: photo.buffer,
            fileName: `report_${dayjs().toISOString()}`,
            folder: "/mangroov_report_images/"
        });

        const report = await prisma.report.create({
            data: {
                photoUrl: photoLink.url, photoId: photoLink.fileId, userId, description, latitude, longitude,
            }
        });

        return report;
    } catch(err) {
        console.log("Error in the createReport service");
        throw err;
    }
}

export const getAllReports = async (status, classification) => {
    let statusArray;
    let classificationArray;
    const whereClause = {};
    if (status) {
        statusArray = status.split(",").map(s => s.trim());
        if (statusArray) whereClause.status = { in: statusArray };
    }
    if (classification) {
        classificationArray = classification.split(",").map(c => c.trim());
        if (classificationArray) whereClause.classification = { in: classificationArray };
    }

    try {
        const reports = await prisma.report.findMany({
            where: whereClause,
            include: { 
                user: { select: { id: true, fullName: true, email: true } }
            },
            orderBy: { createdAt: 'desc' },
        });

        return reports;
    } catch(err) {
        console.log("Error in the getAllReports service");
        throw err;
    }
}

export const updateReportStatus = async (reportId, status) => {
    try {
        const report = await prisma.report.update({
            where: { id: reportId },
            data: { status }
        })

        return report;
    } catch(err) {
        console.log("Error in the updateReportStatus");
        if (err.code === "P2025") {
            throw new customError("Report not found", 404);
        }
        throw err;
    }
}