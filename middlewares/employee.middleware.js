const { Employee } = require('../database');
const { employeeRoles } = require('../constants');

module.exports = {
  checkIsEmployeePresent: async (req, res, next) => {
    const employeeIdChecker = await Employee.findById(req.query.id);
    
    if (!employeeIdChecker) {
      throw new Error('there is no employee with this ID')
    } else {
      next();
    }
  },
}