const { Employee } = require('../database');
const { questions, responseCodesEnum, employeeRoles } = require('../constants');


module.exports = {
    getAllQuestions: async (req, res) => {
        let arr = []
        
        await questions.forEach(question => {
            arr.push(question)
        });

        res.send(arr);
    },

    getHeadOfDept: async (req, res, next) => {
        try {
            const headOfDept = await Employee.findOne({department: req.query.dept, departmentRole: employeeRoles.HEAD});
            if (!headOfDept) {
                throw new Error('there are no head of dept')             
            }

            res.json(`the head of ${headOfDept.department} department is ${headOfDept.lectorName}`);
        } catch (e) {
            next(e);
        }
    }
}