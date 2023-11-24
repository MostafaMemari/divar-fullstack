/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Auth Module and Routes
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      SendOTP:
 *        type: object
 *        required:
 *          - mobile
 *        properties:
 *          mobile:
 *            type: string
 */

/**
 * @swagger
 *
 * /auth/send-otp:
 *  post:
 *    summary: login with OTP is this end-point
 *    tags:
 *      - Auth
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/SendOTP"
 *        application/josn:
 *          schema:
 *            $ref: "#/components/schemas/SendOTP"
 *    responses:
 *      200:
 *        description: success
 *
 *
 */
