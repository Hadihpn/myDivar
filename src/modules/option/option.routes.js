const {Router} = require('express');
const optionController = require('./option.controller');
const router = Router();
router.post("/create",optionController.create)
router.get("/findById/:id",optionController.findById)
router.get("/by-category/:categoryId",optionController.findByCategoryId)
router.get("/",optionController.find)
module.exports = {
    OptionRouter:router
}