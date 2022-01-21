export default async function(req, res, next) {
    try {
        const result = {
            title : 'post create'
        };
        res.send(result);
    } catch (error) {
        return next(error);
    }
}