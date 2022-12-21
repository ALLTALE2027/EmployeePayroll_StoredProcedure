import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import * as employeeController from '../controllers/employeeDetails.controller';
const router = express.Router();

//route to add employee details once onboarded
router.post('/add', userAuth, employeeController.newEmployee);

//route to get all employee details;
router.get('', userAuth, employeeController.getEmployees);

//route to upadate employee details
router.put('/update/:empId', userAuth, employeeController.updateEmployee);

//route to upadate employee details
router.delete('/delete/:empId', userAuth, employeeController.deleteEmployee);

export default router;
