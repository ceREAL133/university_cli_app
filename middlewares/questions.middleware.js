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
  },
  checkIsDepartmentExist: async (req, res, next) => {
    const deptName = req.query.dept;

    const deptNamesArr = await Object.values(deptNames);

    if (!deptNamesArr.includes(deptName)) {
      res.json('there are no dept like this');
      return;
    } else {
      next()
    }
  }
}