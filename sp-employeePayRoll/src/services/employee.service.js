import sequelize, { DataTypes } from '../config/database';

//add new employee
export const newEmployee = async (body, userEmail) => {
  body.employeeEmail = userEmail;
  const data = await sequelize.query(
    'call sp_updateEmployeeData (:ID,:name,:email,:mobile,:address,:gender,:company,:salary)',
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

//get all employee details

export const getEmployees = async () => {
  const data = sequelize.query('call sp_getEmployees');
  return data;
};

//update employee details
export const updateEmployee = async (body, userEmail, empId) => {
  body.employeeEmail = userEmail;
  const data = await sequelize.query(
    'call sp_updateEmployeeData (:ID,:name,:email,:mobile,:address,:gender,:company,:salary)',
    {
      replacements: {
        ID: empId,
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

//delete employee record

export const deleteEmployee = async (empID) => {
  const data = await sequelize.query('call sp_deleteEmployeeRecord(:ID)', {
    replacements: {
      ID: empID
    }
  });

  return data;
};
