const { Employee } = require('../database');

module.exports = {
  checkIsEmployeePresent: async (req, res, next) => {
    try {
      const { employeeId } = req.params;

      const employeeById = await Employee.findById(employeeId);

      if (!employeeById) {
        throw new Error('user not found');
      }

      req.employee = employeeById;

      next();
    } catch (e) {
      next(e);
    }
  }
}