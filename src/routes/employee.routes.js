const express=require("express")
const employeeController = require('../controllers/employee.controller')
const router=express.Router()
router.route('/').get(employeeController.getMany)
router.route('/').post(employeeController.createOne)
router.route('/:id').get(employeeController.getOne)
router.route('/:id').patch(employeeController.updateOne)
router.route('/:id').delete(employeeController.removeOne)
module.exports = router