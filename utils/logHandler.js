export default async (req, res, next) => {
    console.log(
        'TYPE : %s URL : %s  params : %s',
        req.method,
        req.originalUrl,
        JSON.stringify(req.body)
    );

    return next();
}