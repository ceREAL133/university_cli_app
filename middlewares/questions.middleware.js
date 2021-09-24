const { Employee } = require('../database');
const { employeeRoles, deptNames } = require('../constants');

module.exports = {
  checkHeadOfDept: async (req, res, next) => {
    const deptNamesArr = Object.values(deptNames);

    if (!deptNamesArr.includes(req.query.template)){
      res.json('there are no dept like this')
      return
    } else{
      next()
    }
  },
  checkIsDepartmentExist: async (req, res, next) => {
    const deptName = req.query.template;

    const deptNamesArr = await Object.values(deptNames);

    if (!deptNamesArr.includes(deptName)) {
      res.json('there are no dept like this');
      return;
    } else {
      next()
    }
  }
}