/**
 * @swagger
 * tags:
 *  name: Option
 *  description: option Module and Routes
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      CreateOption:
 *        type: object
 *        required:
 *          - title
 *          - key
 *          - type
 *          - category
 *        properties:
 *          title:
 *            type: string
 *          key:
 *            type: string
 *          category:
 *            type: string
 *          guid:
 *            type: string
 *          required:
 *            type: boolean
 *          type:
 *            type: string
 *            enum:
 *              - number
 *              - string
 *              - boolean
 *              - array
 *          enum:
 *            type: array
 *            items:
 *              type: string
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      UpdateOption:
 *        type: object
 *        properties:
 *          title:
 *            type: string
 *          key:
 *            type: string
 *          category:
 *            type: string
 *          guid:
 *            type: string
 *          required:
 *            type: boolean
 *          type:
 *            type: string
 *            enum:
 *              - number
 *              - string
 *              - boolean
 *              - array
 *          enum:
 *            type: array
 *            items:
 *              type: string
 */

/**
 * @swagger
 * /option:
 *  post:
 *    summary: create new option for category
 *    tags:
 *      - Option
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/CreateOption"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/CreateOption"
 *    responses:
 *      201:
 *        description: created
 */

/**
 * @swagger
 * /option/{id}:
 *  put:
 *    summary: updated option by id
 *    tags:
 *      - Option
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/UpdateOption"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/UpdateOption"
 *    responses:
 *      200:
 *        description: updated
 */

/**
 * @swagger
 * /option/by-category/{categoryId}:
 *  get:
 *    summary: get All options of category
 *    tags:
 *      - Option
 *    parameters:
 *      - in: path
 *        name: categoryId
 *        type: string
 *    responses:
 *      200:
 *        description: success
 */

/**
 * @swagger
 * /option/by-category-slug/{slug}:
 *  get:
 *    summary: get All options of category
 *    tags:
 *      - Option
 *    parameters:
 *      - in: path
 *        name: slug
 *        type: string
 *    responses:
 *      200:
 *        description: success
 */

/**
 * @swagger
 * /option/{id}:
 *  get:
 *    summary: get option by id
 *    tags:
 *      - Option
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *    responses:
 *      200:
 *        description: success
 */

/**
 * @swagger
 * /option/{id}:
 *  delete:
 *    summary: delete option by id
 *    tags:
 *      - Option
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *    responses:
 *      200:
 *        description: deleted successfully
 */

/**
 * @swagger
 * /option/:
 *  get:
 *    summary: get all options
 *    tags:
 *      - Option
 *    responses:
 *      200:
 *        description: success
 */
