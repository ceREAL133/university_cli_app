const inquirer = require('inquirer');
const { questions, constant } = require('../constants');
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
        type: 'input',
        name: 'template',
        message: 'Enter department or template (for last question)',
    },
];

let queryOption = null;

module.exports = {
    chooseOptionAndGetResponse: async (req, res, next) => {
        inquirer.prompt(options)
        .then((answer) => {

            questions.forEach(question => {                                          ///////rewrite using find()
                if (Object.values(question).toString() === answer.option) {             
                    queryOption = Object.keys(question).toString()
                }
            }),
            
            axios.get(`${constant.HOST_QUESTIONS}/${queryOption}?template=${answer.template}`)
            .then((response) => console.log(response.data))
        });
        
    },
}
