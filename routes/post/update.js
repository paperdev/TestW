export default async function(req, res, next) {
    try {
        const result = {
            title : 'post update'
        };
        res.send(result);
    } catch (error) {
        return next(error);
    }
}