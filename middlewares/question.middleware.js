const { Employee } = require('../database');

module.exports = {
  checkIsEmployeePresent: async (req, res, next) => {
  
    const { id } = req.params;

    if(id){
      next()
    } else{
      res.error(404)
    }

  }
}