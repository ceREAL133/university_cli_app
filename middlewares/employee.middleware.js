const { Employee } = require('../database');
const { employeeRoles } = require('../constants');

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
  },
  checkWhoIsTheDeptHead: async (req, res, next) => {
    try {
      // console.log(req.params.dept); 

      const headOfDept = await Employee.findOne({dept: req.params.dept, departmentRole: employeeRoles.HEAD});
  
      // console.log(`head of dept ${headOfDept}`);

      if (!headOfDept) {
        throw new Error('there are no head of dept')
      }
  
      req.headOfDept = headOfDept;
      
      next();
    } catch (e){
      next(e);
    }
  }
}