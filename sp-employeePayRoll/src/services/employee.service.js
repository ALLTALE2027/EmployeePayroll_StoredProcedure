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
export const getEmployees = async (body) => {
  const data = await sequelize.query('call sp_getEmployees (:usermail)', {
    replacements: {
      usermail: body.userEmail
    }
  });
  let employeeDetails = [];
  if (data[0].error_status === 0) {
    data.forEach((employee) => {
      let employeeData = {
        employeeID: employee.employeeID,
        employeeName: employee.employeeName,
        employeeEmail: employee.employeeEmail,
        employeeMobile: employee.employeeMobile,
        employeeAddress: employee.employeeAddress,
        gender: employee.gender,
        companyName: employee.companyName,
        startDate: employee.startDate,
        basicPay: employee.basicPay,
        createdAt: employee.createdAt,
        updatedAt: employee.updatedAt
      };
      employeeDetails.push(employeeData);
    });

    return {
      error_status: data[0].error_status,
      message: data[0].message,
      statusCode: data[0].statusCode,
      employeeDetails
    };
  } else {
    return {
      error_status: data[0].error_status,
      message: data[0].message,
      statusCode: data[0].statusCode,
      employeeDetails
    };
  }
};

//get all employees another way-using object destructuring
export const getEmployees2 = async (body) => {
  const data = await sequelize.query('call sp_getEmployees (:usermail)', {
    replacements: {
      usermail: body.userEmail
    }
  });
  let employeeDetails = data.map(
    ({ error_status, message, statusCode, ...rest }) => rest
  );

  if (data[0].error_status === 0) {
    return {
      error_status: data[0].error_status,
      message: data[0].message,
      statusCode: data[0].statusCode,
      employeeDetails
    };
  } else {
    return {
      error_status: data[0].error_status,
      message: data[0].message,
      statusCode: data[0].statusCode
    };
  }
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
