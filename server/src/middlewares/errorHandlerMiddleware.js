const errorHandlerMiddleware = (err, req, res, next) => {
  if (typeof err.message === 'string') {
    if (err.message.includes('not found')) {
      res.status(404).json({ error: true, message: err.message });
    } else {
      res.status(400).json({ error: true, message: err.message });
    }
  } else {
    res.send();
  }
  next();
};

export default errorHandlerMiddleware;
