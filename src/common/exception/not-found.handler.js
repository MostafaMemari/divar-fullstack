const { StatusCodes } = require("http-status-codes");

function NotFoundHandler(app) {
  app.use((req, res, next) => {
    res.status(StatusCodes.NOT_FOUND).json({
      message: "Not Found Route",
    });
  });
}

module.exports = {
  NotFoundHandler,
};
