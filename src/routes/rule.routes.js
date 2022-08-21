const express=require("express")
const ruleController = require('../controllers/rules.controller')
const router=express.Router()
router.route('/').get(ruleController.getMany)
router.route('/').post(ruleController.createOne)
router.route('/:id').get(ruleController.getOne)
router.route('/:id').patch(ruleController.updateOne)
router.route('/:id').delete(ruleController.removeOne)
module.exports = router