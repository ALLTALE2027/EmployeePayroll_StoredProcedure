import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import * as employeeController from '../controllers/employeeDetails.controller';
const router = express.Router();

//route to add employee details once onboarded
router.post('/add', userAuth, employeeController.newEmployee);

export default router;
