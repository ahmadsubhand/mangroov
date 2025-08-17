import e from "express";
import user from "./user.route.js";
import report from "./report.route.js";

export default (app) => {
    const router = e.Router();

    router.get('/', (req, res) => {
        res.send('Ini endpoint home apinya');
    })

    router.use('/user', user);
    router.use('/report', report);

    app.use('/api', router);
}