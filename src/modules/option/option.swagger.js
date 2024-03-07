
/**
 * @swagger
 * tags:
 *  name: Option
 *  description: Option Module and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateOption:
 *              type: object
 *              required:
 *                  -   title
 *                  -   key
 *                  -   guide
 *                  -   category
 *                  -   required
 *              properties:
 *                  title:
 *                      type: string
 *                  key:
 *                      type: string
 *                  category:
 *                      type: string
 *                  guide:
 *                      type: string
 *                  type:
 *                      type: string
 *                      enum:
 *                          - number
 *                          - string
 *                          - boolean
 *                          - array
 *                  enum:
 *                      type: array
 *                      items: 
 *                          type: string
 *                  required:
 *                      type: boolean
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *         UpdateOption:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                  key:
 *                      type: string
 *                  category:
 *                      type: string
 *                  guide:
 *                      type: string
 *                  type:
 *                      type: string
 *                      enum:
 *                          - number
 *                          - string
 *                          - boolean
 *                          - array
 *                  enum:
 *                      type: array
 *                      items: 
 *                          type: string
 *                  required:
 *                      type: boolean
 */
/**
 * @swagger
 * /option:
 *  post:
 *      summary: create new option for category
 *      tags:
 *          -   Option
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateOption'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateOption'
 *      responses:
 *          201: 
 *              description: created
 */
/**
 * @swagger
 * /option/by-category/{categoryId}:
 *  get:
 *      summary: get  options by categoryId
 *      tags:
 *          -   Option
 *      parameters:
 *          -   in: path
 *              name: categoryId
 *              type: string
 *      responses:
 *          200: 
 *              description: successfully
 */
/**
  
 /**
 * @swagger
 * /option/by-category-slug/{slug}:
 *  get:
 *      summary: get  options by slug
 *      tags:
 *          -   Option
 *      parameters:
 *          -   in: path
 *              name: slug
 *              type: string
 *      responses:
 *          200: 
 *              description: successfully
 */

/**
 * @swagger
 * /option/{id}:
 *  get:
 *      summary: get options by id
 *      tags:
 *          -   Option
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *      responses:
 *          200: 
 *              description: successfully
 */
/**
 * @swagger
 * /option:
 *  get:
 *      summary: get all options
 *      tags:
 *          -   Option
 
 *      responses:
 *          200: 
 *              description: successfully
 */
/**
 * @swagger
 * /option/{id}:
 *  delete:
 *      summary: delete option by id
 *      tags:
 *          -   Option
 *      parameters:
 *          -   in: path
 *              name: id
 *      responses:
 *          200: 
 *              description: deleted successfully
 */
/**
 * @swagger
 * /option/{id}:
 *  put:
 *      summary: updated option by id
 *      tags:
 *          -   Option
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateOption'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateOption'
 *      responses:
 *          201: 
 *              description: update
 */