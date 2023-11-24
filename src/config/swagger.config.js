const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

function SwaggerConfig(app) {
  const swaggerDocument = swaggerJSDoc({
    swaggerDefinition: {
      info: {
        title: "Divar - BackEnd",
        description: "BackEnd divar.js nodejs",
        virsion: "1.0.0",
      },
    },
    apis: [],
  });

  const swagger = swaggerUi.setup(swaggerDocument, {});

  app.use("/", swaggerUi.serve, swagger);
}

module.exports = { SwaggerConfig };
