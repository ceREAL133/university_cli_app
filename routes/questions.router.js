const router = require('express').Router()

const { questionsController } = require('../controllers')
const { questionsMiddleware } = require('../middlewares')

router.get('/', questionsController.getAllQuestions)

router.get('/headOfDept', questionsMiddleware.checkHeadOfDept, questionsController.getHeadOfDept);
router.get('/deptStats', questionsMiddleware.checkIsDepartmentExist, questionsController.showDeptStat);
router.get('/avgSalary', questionsMiddleware.checkIsDepartmentExist, questionsController.showAvgSalary);
router.get('/countOfEmployee', questionsMiddleware.checkIsDepartmentExist, questionsController.showCountOfEmployee);
// router.get('/globalSearch', questionsController.findByGlobalSearchTemplate);

module.exports = router;