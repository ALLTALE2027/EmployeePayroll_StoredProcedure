import sequelize, { DataTypes } from '../config/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//create new user
export const newUser = async (body) => {
  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(body.password, saltRounds);
  body.password = hashPassword;
  const data = await sequelize.query(
    'call sp_addUser (:firstName,:lastName,:email,:password)',
    {
      replacements: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password
      }
    }
  );
  return data;
};

//login user
export const login = async (body) => {
  const data = await sequelize.query('call sp_getSingleUser (:email)', {
    replacements: {
      email: body.email
    }
  });
  console.log(data);

  if (data !== null) {
    const result = await bcrypt.compare(body.password, data[0].Password);
    if (result) {
      var token = jwt.sign(
        { email: data[0].Email, id: data[0].id },
        process.env.SECRET_KEY
      );
      return {
        token,
        error_status: data[0].error_status,
        message: data[0].message,
        statusCode: data[0].statusCode
      };
    } else {
      throw Error('Invalid credentials');
    }
  } else {
    throw Error('Invalid Email');
  }
};
