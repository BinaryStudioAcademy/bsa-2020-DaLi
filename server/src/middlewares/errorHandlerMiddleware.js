export default (err, _, res, next) => {
    console.error(err); // only for development
    let {message} = err;
    const {statusCode = 500} = err;

    if (res.headersSent) {
        return next(err);
    }
    return res.status(statusCode)
        .send({
            error: true,
            message,
            statusCode,
        });
};
