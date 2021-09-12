const { Employee } = require('../database');

module.exports = {
 
  // FOR FUTURE
  getEmployeeByParamsInternal: (id) => {
    return Employee.findById(id).select('+password +token -email');
  },

};
