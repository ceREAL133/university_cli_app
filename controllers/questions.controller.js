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
            const headOfDept = await Employee.findOne({department: req.query.template, departmentRole: employeeRoles.HEAD});
            if (!headOfDept) {
                throw new Error('there are no head of dept')             
            }

            res.json(`the head of ${headOfDept.department} department is ${headOfDept.lectorName}`);
        } catch (e) {
            next(e);
        }
    },

    showDeptStat: async (req, res, next) => {
        const dept = req.query.template;
        let assistantsArr = [];
        let professorsArr = [];
        let asociateProfessorsArr = [];

        try {
            const deptWorkersArr = await Employee.find({department: dept});
           
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
        const dept = req.query.template;
        let sumSalary = 0;
        try {
            const deptWorkersArr = await Employee.find({department: dept});
            deptWorkersArr.forEach((worker)=>{
                sumSalary += worker.salary
            })
            let avgSalary = sumSalary/deptWorkersArr.length;

            res.json(`avarage salary for ${dept} department is $${avgSalary}`)
        } catch (e) {
            next(e)
        }
    },

    showCountOfEmployee: async (req, res, next) => {
        const dept = req.query.template;

        try{
            const deptWorkersArr = await Employee.find({department: dept});

            res.json(`There are ${deptWorkersArr.length} employee in ${dept} department`)
        } catch (e) {
            next(e)
        }
    },

    findByGlobalSearchTemplate: async (req, res, next) => {
        const template = req.query.template;

        Employee.search(template, (err, data)=> {
            if(data.length !== 0){
                res.json(data)
            } else{
                res.json("no coincidence")
            }
        })
    }
}