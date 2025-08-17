import e from "express"

export default (app) => {
    const router = e.Router();
    router.get('/', (req, res) => {
        res.send('Ini endpoint home apinya');
    })

    app.use('/api', router);
}