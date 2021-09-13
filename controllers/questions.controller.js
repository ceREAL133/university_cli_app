const { Employee } = require('../database');
const { questions, responseCodesEnum } = require('../constants');


module.exports = {
    getAllQuestions: async (req, res) => {
        let arr = []
        
        await questions.forEach(question => {
            arr.push(question)
        });

        res.send(arr);
    },
    getAllEmployees: async (req, res) => {
        const employees = await Employee.find({});

        res.json(employees)
    },
    
    getEmployeeById: (req, res) => {
        const { employee } = req;

        console.log(employee);
        
        res.json(employee);
    },

    createEmployee: async (req, res, next) => {
        try {
          const createdEmployee = await Employee.create(req.body);
    
          res.status(responseCodesEnum.CREATED).json(createdEmployee)
        } catch (e) {
          next(e);
        }
    },
}