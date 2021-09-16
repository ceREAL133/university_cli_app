const router = require('express').Router()

const { employeeController } = require('../controllers')
const { employeeMiddleware } = require('../middlewares')

router.get('/', employeeController.getAllQuestions)
router.get('/employee', employeeController.getAllEmployees)
router.get('/employee/:employeeId', employeeMiddleware.checkIsEmployeePresent, employeeController.getEmployeeById)
router.post('/employee', employeeController.createEmployee)

router.get('/employee/headOfDept/:dept', employeeMiddleware.checkWhoIsTheDeptHead, employeeController.getHeadOfDept)

module.exports = router;