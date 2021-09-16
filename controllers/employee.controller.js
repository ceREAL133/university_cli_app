const { Employee } = require('../database');
const { questions, responseCodesEnum } = require('../constants');


module.exports = {
    createEmployee: async (req, res, next) => {
        try {
          const createdEmployee = await Employee.create(req.body);
    
          res.status(responseCodesEnum.CREATED).json(createdEmployee)
        } catch (e) {
          next(e);
        }
    },

    getAllEmployees: async (req, res) => {
        const employees = await Employee.find({});

        res.json(employees)
    },
    
    getEmployeeById: (req, res) => {
        const { employee } = req;
        
        res.json(employee);
    },


    getHeadOfDept: (req, res) => {
        const { headOfDept } = req;

        res.json(`the head of ${req.params.dept} department is ${headOfDept.lectorName}`);
    }
}