const express = require('express');
const router = express.Router();
const employee = require('../models/Employee');
const { body, validationResult } = require('express-validator');
const mongoose=require("mongoose")
// ROUTE 1: Get All the employees using: GET "/api/employees/getuser". Login required
router.get('/fetchallemployees',  async (req, res) => {
    try {
        const employees = await employee.find({ });
        res.json(employees)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 2: Add a new employee using: POST "/api/employees/addemployee". Login required
router.post('/createEmployee',  [
    body('id', 'Enter a valid id').isLength({ min: 1 }),
    body('employee_name', 'enter valid name').isLength({ min: 2 }),
    body('employee_salaryinMonth', 'enter valid salary').isLength({ min: 3 }),
], async (req, res) => {
        try {
            const { id,employee_name,employee_salaryinMonth } = req.body;
            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const Employee = new employee({
                id, employee_name,employee_salaryinMonth 
            })
            const savedemployee = await Employee.save()

            res.json(savedemployee)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

// ROUTE 3: Update an existing employee using: PUT "/api/employees/updateemployee". Login required
router.put('/updateemployee/:id',  async (req, res) => {
    const { id,employee_name,employee_salaryinMonth } = req.body;
    try {
        // Create a newemployee object
        let newEmployee = {};
        if (id) { newEmployee.id = id };
        if (employee_name) { newEmployee.employee_name = employee_name };
        if (employee_salaryinMonth) { newEmployee.employee_salaryinMonth = employee_salaryinMonth };
        // Find the employee to be updated and update it
        let Employee = await employee.findById(req.params.id);
        if (!Employee) { return res.status(404).send("Not Found") }

        Employee = await employee.findByIdAndUpdate(req.params.id, { $set: newEmployee }, { new: true })
        res.json({ Employee });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4: Delete an existing employee using: DELETE "/api/employees/deleteemployee". Login required
router.delete('/deleteemployee/:id',  async (req, res) => {
    try {
        // Find the employee to be delete and delete it
        let Employee = await employee.findById(req.params.id);
        if (!Employee) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this employee
        Employee = await employee.findByIdAndDelete(req.params.id)
        res.json({ "Success": "employee has been deleted", Employee: Employee });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router