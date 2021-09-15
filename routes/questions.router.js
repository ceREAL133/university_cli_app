const router = require('express').Router()

const { questionsController } = require('../controllers')
const { questionMiddleware } = require('../middlewares')

router.get('/', questionsController.getAllQuestions)
router.get('/employee', questionsController.getAllEmployees)
router.get('/employee/:employeeId', questionMiddleware.checkIsEmployeePresent, questionsController.getEmployeeById)
router.post('/employee', questionsController.createEmployee)

router.get('/employee/headOfDept/:dept', questionMiddleware.checkWhoIsTheDeptHead, questionsController.getHeadOfDept)

module.exports = router;