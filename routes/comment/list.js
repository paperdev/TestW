export default async function(req, res, next) {
    try {
        const result = {
            title : ' comment list'
        };
        res.send(result);
    } catch (error) {
        return next(error);
    }
}