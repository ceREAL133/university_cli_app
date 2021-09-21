const inquirer = require('inquirer');
const { questions, deptNames } = require('../constants')

let questionsArray = [] 

questions.forEach((question)=>{
    questionsArray.push(Object.values(question));
})



let userChoise = null;

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
]

module.exports = {
    chooseOption: async (req, res, next) => {
        await inquirer.prompt(options).then((answer) => {
            //  if (answer.department == "math") {
            //      console.log('hooray');
            //  }
            userChoise = JSON.parse(JSON.stringify(answer, null, '  '));
        });
        console.log(userChoise);
        console.log(userChoise.department);

        questions.forEach((question)=>{
            // console.log(Object.values(question).toString());
            if (Object.values(question).toString()===userChoise.option) {
                res.redirect("http://localhost:3000/employee")
            }
        })
    }
    
}

