export default async function(req, res, next) {
    try {
        const result = {
            title : 'post list'
        };
        res.send(result);
    } catch (error) {
        return next(error);
    }
}