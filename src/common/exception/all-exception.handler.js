const { StatusCodes } = require("http-status-codes");

function AllExceptionHandler(app) {
  app.use((err, req, res, next) => {
    let status = err?.status ?? err?.statusCode ?? err?.code;
    if (!status || isNaN(+status) || status > 511 || status < 200) status = StatusCodes.INTERNAL_SERVER_ERROR;

    res.status(status).json({
      message: err?.message ?? err?.stack ?? "InternalServerError",
    });
  });
}

module.exports = {
  AllExceptionHandler,
};
