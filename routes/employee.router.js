const router = require('express').Router()

const { employeeController } = require('../controllers')
const { employeeMiddleware } = require('../middlewares')

router.get('/', employeeController.getAllEmployees)
router.get('/userById', employeeMiddleware.checkIsEmployeePresent, employeeController.getEmployeeById)
router.post('/', employeeController.createEmployee)

module.exports = router;