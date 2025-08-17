import dayjs from "dayjs";
import imagekit from "../utils/imagekit.js";
import prisma from "../utils/prisma.js";

export const createReport = async (userId, photo, description, latitude, longitude, classification, status) => {
    try {
        const photoLink = await imagekit.upload({
            file: photo.buffer,
            fileName: `report_${dayjs().toISOString()}`,
            folder: "/mangroov_report_images/"
        });

        const report = await prisma.report.create({
            data: {
                photoUrl: photoLink.url, photoId: photoLink.fileId, userId,
                description, latitude, longitude, classification, status
            }
        });

        return report;
    } catch(err) {
        console.log("Error in the createReport service");
        throw err;
    }
}

export const getAllReports = async () => {
    
}