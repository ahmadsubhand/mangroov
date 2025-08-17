import { comparePassword, hashPassword } from "../utils/hash.js"
import prisma from "../utils/prisma.js";
import customError from "../utils/customError.js";
import { getToken } from "../utils/jwt.js";

export const getAuthToken = (id) => {
    const expiresIn = process.env.JWT_REFRESH_EXPIRATION || '28d';
    const token = getToken({ id, type: 'auth_token' }, expiresIn);
    return token;
} 

export const register = async (fullName, phoneNumber, role, email, password, picture) => {
    try {
        const hashedPassword = await hashPassword(password);
        const user = await prisma.user.create({
            data: { 
                fullName, phoneNumber, role, email, password: hashedPassword, ...(picture && { picture })
            }
        });

        delete user.password;
        return user;
    } catch(err) {
        console.log("Error in the register service");
        if (err.code == "P2002") {
            throw new customError("Email or phone number already in use", 409);
        }
        throw err;
    }
}

export const login = async (email, password) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });
        if (!user || !await comparePassword(password, user.password)) {
            throw new customError('Invalid email or password', 400);
        }
        
        delete user.password;
        return { token: getAuthToken(user.id), ...user };
    } catch(err) {
        console.log("Error in the login service");
        throw err;
    }
}

export const isAuthenticated = async (id) => {
    try {
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new customError('User not found', 400)
        }
        
        delete user.password;
        return user;
    } catch(err) {
        console.log("Error in the isAuthenticated service");
        throw err;
    }
}

export const getAllMyReports = async (userId, status, classification) => {
    let statusArray;
    let classificationArray;
    const whereClause = { userId };
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