export default (err, req, res, next) => {
    if (_.isEmpty(req.body)) {
        return next('body parameter is empty.');
    }
    
    return next();
}