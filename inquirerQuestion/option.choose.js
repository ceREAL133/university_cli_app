const inquirer = require('inquirer');
const { questions, deptNames } = require('../constants')

let questionsArray = [] 

questions.forEach((question)=>{
    questionsArray.push(Object.values(question));
})

function chooseOption () {
    inquirer.prompt(options).then((answer) => {
        if (answer.department == "math") {
            console.log('hooray');
        }
        console.log(JSON.stringify(answer, null, '  '));
    });
}

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



module.exports = { chooseOption };

