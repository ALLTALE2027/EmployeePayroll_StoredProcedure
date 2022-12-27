import HttpStatus from 'http-status-codes';
import * as EmployeeService from '../services/employee.service';

/**
 * Controller to add employee details
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newEmployee = async (req, res, next) => {
  try {
    const data = await EmployeeService.newEmployee(
      req.body,
      req.body.userEmail
    );
    res.status(data[0].statusCode).json({
      code: data[0].statusCode,
      success: data[0].error_status == 1 ? false : true,
      message: data[0].message
    });
  } catch (error) {
    res.status(data[0].statusCode).json({
      code: data[0].statusCode,
      success: data[0].error_status == 1 ? false : true,
      message: `${error}`
    });
  }
};

/**
 * Controller to get employee details
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getEmployees = async (req, res, next) => {
  try {
    const data = await EmployeeService.getEmployees2(req.body);
    const { error_status, message, statusCode, employeeDetails } = data;
    res.status(statusCode).json({
      code: statusCode,
      success: error_status == 1 ? false : true,
      data: employeeDetails,
      message: message
    });
  } catch (error) {
    res.status(statusCode).json({
      code: statusCode,
      success: error_status == 1 ? false : true,
      message: `${error}`
    });
  }
};

/**
 * Controller to update employee details
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateEmployee = async (req, res, next) => {
  try {
    const data = await EmployeeService.updateEmployee(
      req.body,
      req.body.userEmail,
      req.params.empId
    );
    res.status(data[0].statusCode).json({
      code: data[0].statusCode,
      success: data[0].error_status == 1 ? false : true,
      message: data[0].message
    });
  } catch (error) {
    res.status(data[0].statusCode).json({
      code: data[0].statusCode,
      success: data[0].error_status == 1 ? false : true,
      message: `${error}`
    });
  }
};

/**
 * Controller to delete employee details
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteEmployee = async (req, res, next) => {
  try {
    const data = await EmployeeService.deleteEmployee(req.params.empId);
    res.status(data[0].statusCode).json({
      code: data[0].statusCode,
      success: data[0].error_status == 1 ? false : true,
      message: data[0].message
    });
  } catch (error) {
    res.status(data[0].statusCode).json({
      code: data[0].statusCode,
      message: `${error}`
    });
  }
};
