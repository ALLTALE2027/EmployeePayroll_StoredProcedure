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
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Employee details added successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
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
    const data = await EmployeeService.getEmployees();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Employee details fetched successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
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
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Employee details updated successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
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
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Employee details deleted successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};
