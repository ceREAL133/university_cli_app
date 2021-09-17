const router = require('express').Router()

const { questionsController } = require('../controllers')
const { questionsMiddleware } = require('../middlewares')

router.get('/', questionsController.getAllQuestions)
// router.get('/headOfDept', (req, res) => {
//     req.query.dept1 === 'math'  // true
//     req.query.dept2 === 'english'  // true
  
//     res.json(req.query)
//   })
  
router.get('/headOfDept/',questionsMiddleware.checkHeadOfDept, questionsController.getHeadOfDept)

module.exports = router;