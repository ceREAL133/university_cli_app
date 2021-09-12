const router = require('express').Router()

const { questionsController } = require('../controllers')

router.get('/', questionsController.getAllQuestions)
router.get('/employee', questionsController.getAllEmployees)
router.get('/employee/:id', questionsController.getEmployeeById)
router.post('/employee', questionsController.createEmployee)

module.exports = router;