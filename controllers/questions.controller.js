const { Employee } = require('../database');
const { questions, responseCodesEnum, employeeRoles, employeeDegrees } = require('../constants');


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
    },

    showDeptStat: async (req, res, next) => {
        const dept = req.query.dept
        let assistantsArr = [];
        let professorsArr = [];
        let asociateProfessorsArr = [];

        try {
            const deptWorkersArr = await Employee.find({department: dept})
           
            deptWorkersArr.forEach((worker) => {
                if (worker.degree === employeeDegrees.PROFESSOR) {
                    professorsArr.push(worker.lectorName);
                } else if (worker.degree === employeeDegrees.ASSOCIATE_PROFESSOR){
                    asociateProfessorsArr.push(worker.lectorName);
                } else if (worker.degree === employeeDegrees.ASSISTANT){
                    assistantsArr.push(worker.lectorName);
                }
            })

            res.json(`assistants- ${assistantsArr.length} professors- ${professorsArr.length} asociateProfessors- ${asociateProfessorsArr.length}`);
        } catch (e) {
            next(e)
        }

    },
    showAvgSalary: async (req, res, next) => {
        const dept = req.query.dept
        let sumSalary = 0;
        try {
            const deptWorkersArr = await Employee.find({department: dept})
            deptWorkersArr.forEach((worker)=>{
                sumSalary += worker.salary
            })
            let avgSalary = sumSalary/deptWorkersArr.length;

            res.json(`avarage salary for ${dept} department is $${avgSalary}`)
        } catch (e) {
            next(e)
        }
    }
}