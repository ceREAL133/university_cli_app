const router = require('express').Router()

const { questionsController } = require('../controllers')
const { questionsMiddleware } = require('../middlewares')

router.get('/', questionsController.getAllQuestions)

router.get('/headOfDept',questionsMiddleware.checkHeadOfDept, questionsController.getHeadOfDept);
router.get('/deptStats',questionsMiddleware.checkIsDepartmentExist, questionsController.showDeptStat);

module.exports = router;