const { Schema, model } = require('mongoose');
const { deptNames, employeeRoles, databaseTablesEnum, employeeDegrees} = require('../constants');

const employeeSchema = new Schema({
  lectorName: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    enum: Object.values(employeeDegrees)
  },
  department: {
    type: String,
    enum: Object.values(deptNames)
  },
  departmentRole: {
    type: String,
    enum: Object.values(employeeRoles)
  },
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model(databaseTablesEnum.EMPLOYEE, employeeSchema);
