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

    getHeadOfDept: (req, res) => {
        const { headOfDept } = req;

        res.json(`the head of ${req.params.dept} department is ${headOfDept.lectorName}`);
    }
}