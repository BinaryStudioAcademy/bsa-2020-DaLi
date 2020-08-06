const errorHandlerMiddleware = (err, req, res, next) => {
  if (typeof err === "string") {
    if (err.includes("not found")) {
      res.status(404).json({ error: true, message: err });
    } else {
      res.status(400).json({ error: true, message: err });
    }
  } else {
    res.send();
  }
};

export default errorHandlerMiddleware;
