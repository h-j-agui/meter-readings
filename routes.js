const express = require('express');
const router = express.Router();


const adminController = require('./controllers/admin.controller');
const employeeController = require('./controllers/employee.controller');
const meterController = require('./controllers/meter.controller');
const meter_entriesController = require('./controllers/meter_entries.controller');



router.get('/', (req, res) => {
    res.render('index.ejs')
});
router.get('/form', (req, res) => {
    res.render('form.ejs')
});
router.get('/admin', (req, res) => {
    res.render('admin.ejs')
});

//administrator login
router.get('/admin', adminController.getAdmin);

//adding, editing and deleting administrators and employees
router.post('/admin/addUser', employeeController.addEmployee);
router.post('/admin/addAdmin', adminController.addAdmin);

router.put('/admin/addUser', employeeController.editEmployee);
router.put('/admin/addAdmin', adminController.editAdmin);

router.delete('/admin/addUser', employeeController.deleteEmployee);
router.delete('/admin/addAdmin', adminController.deleteAdmin);

//employee login
router.get('/', employeeController.getEmployee);

//Meter
router.get('/form/index', meterController.getMeter);
router.post('/form/index', meterController.addMeter);

//edit and delete with admin access
router.put('/admin/meter', meterController.editMeter);
router.delete('/admin/meter', meterController.deleteMeter);

//Meter-entries
router.get('/form', meter_entriesController.getMeter_entries);
router.post('/form', meter_entriesController.addMeter_entries);

//edit and delete with admin access
router.put('/admin/Meter_entries', meter_entriesController.editMeter_entries);
router.delete('/admin/Meter_entries', meter_entriesController.deleteMeter_entries);

module.exports = router;