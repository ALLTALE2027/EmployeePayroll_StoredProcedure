import sequelize, { DataTypes } from '../config/database';

//add new employee
export const newEmployee = async (body) => {
  body.employeeEmail = userEmail;
  const data = await sequelize.query(
    'call sp_addEmployee (:ID,:name,:email,:mobile,:address,:gender,:company,:salary)',
    {
      replacements: {
        ID: body.employeeID,
        name: body.employeeName,
        email: body.employeeEmail,
        mobile: body.employeeMobile,
        address: body.employeeAddress,
        gender: body.gender,
        company: body.companyName,
        salary: body.basicPay
      }
    }
  );
  return data;
};
