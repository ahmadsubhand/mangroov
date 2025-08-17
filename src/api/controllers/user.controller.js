import * as services from "../services/user.service.js";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration.js';

dayjs.extend(duration)

export const setAuthCookie = (res, token) => {
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: dayjs.duration(28, 'days').asMilliseconds(),
    })
}

export const register = async (req, res, next) => {
    try {
        const { fullName, phoneNumber, role, email, password, picture } = req.body;
        const data = await services.register(fullName, phoneNumber, role, email, password, picture);
        res.status(201).json(data);
    } catch(err) {
        console.log("Error in the register controller");
        next(err);
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { token, ...data} = await services.login(email, password);
        setAuthCookie(res, token);
        res.status(200).json(data);
    } catch(err) {
        console.log("Error in the login controller");
        next(err);
    }
}

export const logout = async (req, res, next) => {
    try {
        res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        res.status(200).json({});
    } catch(err) {
        console.log("Error in the logout controller");
        next(err);
    }
}


export const isAuthenticated = async (req, res, next) => {
    try {
        const { id } = req.user;
        const data = await services.isAuthenticated(id);
        res.status(200).json(data);
    } catch(err) {
        console.log("Error in the isAuthenticated controller");
        next(err);
    }
}

export const isOrganization = async (req, res, next) => {
    try {
        const { id } = req.user;
        res.status(200).json({ id });
    } catch(err) {
        console.log("Error in the isOrganization controller");
        next(err);
    }
}