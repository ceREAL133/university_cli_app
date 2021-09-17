const { Schema, model } = require('mongoose');
const { deptNames, employeeRoles, databaseTablesEnum, employeeDegrees} = require('../constants');

const employeeSchema = new Schema({
  lectorName: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    enum: Object.values(employeeDegrees),
    required: true
  },
  department: {
    type: String,
    enum: Object.values(deptNames),
    required: true
  },
  departmentRole: {
    type: String,
    enum: Object.values(employeeRoles),
    required: true
  },
  salary: {
    type: Number,
    min: 100,
    max: 3000,
    required: true
  },
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model(databaseTablesEnum.EMPLOYEE, employeeSchema);
