const router = require('express').Router()

const { questionsController } = require('../controllers')
const { questionsMiddleware } = require('../middlewares')

router.get('/', questionsController.getAllQuestions)

// router.get('/employee/headOfDept/:dept', employeeMiddleware.checkWhoIsTheDeptHead, employeeController.getHeadOfDept)

module.exports = router;