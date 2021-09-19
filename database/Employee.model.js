const { Schema, model } = require('mongoose');
const { deptNames, employeeRoles, databaseTablesEnum, employeeDegrees} = require('../constants');

const employeeSchema = new Schema({
  lectorName: {
    type: String,
    text: true,
    required: true
  },
  degree: {
    type: String,
    text: true,
    enum: Object.values(employeeDegrees),
    required: true
  },
  department: {
    type: String,
    text: true,
    enum: Object.values(deptNames),
    required: true
  },
  departmentRole: {
    type: String,
    text: true,
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

employeeSchema.statics = {
  searchPartial: function(q, callback) {
      return this.find({
          $or: [
              { "lectorName": new RegExp(q, "gi") },
              { "degree": new RegExp(q, "gi") },
              { "department": new RegExp(q, "gi") },
              { "department": new RegExp(q, "gi") },
              { "departmentRole": new RegExp(q, "gi") }
          ]
      }, callback);
  },

  searchFull: function (q, callback) {
      return this.find({
          $text: { $search: q, $caseSensitive: false }
      }, callback)
  },

  search: function(q, callback) {
      this.searchFull(q, (err, data) => {
          if (err) return callback(err, data);
          if (!err && data.length) return callback(err, data);
          if (!err && data.length === 0) return this.searchPartial(q, callback);
      });
  },
}

module.exports = model(databaseTablesEnum.EMPLOYEE, employeeSchema);
