/**
 * @exports errorHandler
 * @class ErrorHandler
 */
class ErrorHandler {
  /**
       * Handles all uncaught errors in the app
       * @method handleError
       * @param {object} err
       * @param {object} req
       * @param {object} res
       * @param {function} next
       * @returns {function} Function next() or JSON object
       */
  handleError(err, req, res, next) {
    if (res.headersSent) {
      return next(err);
    }

    return res.status(err.status || 500).send(err.message);
  }
}

const errorHandler = new ErrorHandler();

export default errorHandler;
