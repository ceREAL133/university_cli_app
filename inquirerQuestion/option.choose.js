const inquirer = require('inquirer');
const { questions, deptNames } = require('../constants');
const axios = require('axios');

let questionsArray = []; 

questions.forEach((question)=>{
    questionsArray.push(Object.values(question));
})


const options = [
    {
        type: 'list',
        name: 'option',
        message: 'Choose option',
        choices: questionsArray.flat()                        
    },
    {
        type: 'rawlist',
        name: 'department',
        message: 'choose department',
        choices: Object.values(deptNames),
    },
];

let queryOption = null;
let queryDept = null;
module.exports = {
    chooseOptionAndGetResponse: async (req, res, next) => {
        inquirer.prompt(options)
        .then((answer)=>{
            console.log(answer);
            queryDept = answer.department;

            questions.forEach(question => {
                if (Object.values(question).toString() === answer.option) {
                    queryOption = Object.keys(question).toString()
                    console.log(queryOption);
                }
            }),
            axios.get(`http://localhost:3000/questions/${queryOption}?dept=${queryDept}`)
            .then((response) => console.log(response.data))
        });
        
    },
}
