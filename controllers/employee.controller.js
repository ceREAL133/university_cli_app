const { Employee } = require('../database');
const { questions, responseCodesEnum } = require('../constants');


module.exports = {
    createEmployee: async (req, res, next) => {
        try {
          const searchedEmployee = await Employee.findOne(req.body);

          if (!searchedEmployee) {
            const createdEmployee = await Employee.create(req.body);
    
            res.status(responseCodesEnum.CREATED).json(createdEmployee)
          } else{
              throw new Error('employee already exists')
          }
        } catch (e) {
          next(e);
        }
    },

    getAllEmployees: async (req, res) => {
        const employees = await Employee.find({});

        res.json(employees)
    },
    
    getEmployeeById: async (req, res, next) => {
        try {
            const { employeeId } = req.params
            const employeeById = await Employee.findById(employeeId);

            res.json(employeeById)
        } catch (e) {
            next(e);
        }
    },
}