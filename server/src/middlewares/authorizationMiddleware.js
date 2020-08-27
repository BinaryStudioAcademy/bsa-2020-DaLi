import jwtMiddleware from './jwtMiddleware';

export default (routesWhiteList = []) => (req, res, next) => {
  return routesWhiteList.some((route) => route === req.path) ? next() : jwtMiddleware(req, res, next);
};
