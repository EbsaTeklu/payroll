const taxRuleModel= require('../model/taxrule.model')
const controller = require('../utils/crud')
const taxRuleController = controller.crudControllers(taxRuleModel)
module.exports = taxRuleController