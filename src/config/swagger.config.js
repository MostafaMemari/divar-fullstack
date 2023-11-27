const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

function SwaggerConfig(app) {
  const swaggerDocument = swaggerJSDoc({
    swaggerDefinition: {
      openapi: "3.0.1",
      info: {
        title: "Divar - BackEnd",
        description: "BackEnd divar.js nodejs",
        virsion: "1.0.0",
      },
    },
    apis: [process.cwd() + "/src/modules/**/*.swagger.js"],
  });

  const swagger = swaggerUi.setup(swaggerDocument, {});

  app.use("/swagger", swaggerUi.serve, swagger);
}

module.exports = { SwaggerConfig };
