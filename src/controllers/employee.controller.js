const employeeModel= require('../model/employee.model')
const controller = require('../utils/crud')
const employeeController = controller.crudControllers(employeeModel)
module.exports = employeeController