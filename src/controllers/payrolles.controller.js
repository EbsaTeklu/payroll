const payrollModel= require('../model/payroll.model')
const controller = require('../utils/crud')
const payrollController = controller.crudControllers(payrollModel)
module.exports = payrollController