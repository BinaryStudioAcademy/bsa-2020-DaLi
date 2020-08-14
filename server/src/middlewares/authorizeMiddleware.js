const authorizeMiddleware = (req, res, next) => {
  const authorizationHeader = req.header('Authorization');
  if (!authorizationHeader) {
    res.status(401).json('Unauthorized');
  }
  next();
};

export default authorizeMiddleware;
