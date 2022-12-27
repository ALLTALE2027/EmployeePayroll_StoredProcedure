import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newUser = async (req, res, next) => {
  try {
    const data = await UserService.newUser(req.body);
    res.status(data[0].statusCode).json({
      code: data[0].statusCode,
      success: data[0].error_status == 1 ? false : true,
      message: data[0].message
    });
  } catch (error) {
    res.status(data[0].statusCode).json({
      code: data[0].statusCode,
      success: data[0].error_status == 1 ? false : true,
      message: data[0].message
    });
  }
};

/**
 * Controller to login a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const login = async (req, res, next) => {
  try {
    const data = await UserService.login(req.body);
    const { token, error_status, message, statusCode } = data;
    res.status(statusCode).json({
      code: statusCode,
      success: error_status == 1 ? false : true,
      data: token,
      message: message
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};
