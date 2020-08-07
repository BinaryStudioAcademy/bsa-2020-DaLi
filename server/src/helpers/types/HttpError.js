export default class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    if (statusCode < 400 || statusCode > 599) {
      throw new Error(`Expected error HTTP status (400 - 599), got ${statusCode}`);
    }
    this.name = 'HttpError';
    this.statusCode = statusCode;
  }

  // The most common client HTTP errors
  static badRequest(message) {
    return new HttpError(400, message || 'Bad Request');
  }

  static unauthorized(message) {
    return new HttpError(401, message || 'Unauthorized');
  }

  static notFound(message) {
    return new HttpError(404, message || 'Not Found');
  }
}
