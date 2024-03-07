const {Router} = require('express');
const optionController = require('./option.controller');
const router = Router();
router.post("/",optionController.create)
router.get("/findById/:id",optionController.findById)
router.get("/by-category/:categoryId",optionController.findByCategoryId)
router.get("/by-category-slug/:slug",optionController.findByCategoryId)
router.get("/",optionController.find)
module.exports = {
    OptionRouter:router
}