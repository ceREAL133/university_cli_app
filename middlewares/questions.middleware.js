const { Employee } = require('../database');
const { employeeRoles, deptNames } = require('../constants');

module.exports = {
  
  checkHeadOfDept: async (req, res, next) => {
    const deptNamesArr = Object.values(deptNames);

    if (!deptNamesArr.includes(req.query.dept)){
      res.json('there are no dept like this')
      return
    } else{
      next()
    }
  }
}