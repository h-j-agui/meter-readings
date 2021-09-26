const express = require('express');
const { redirect } = require('express/lib/response');
const router = express.Router();
const passport = require('passport');

const checkAuth = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }

    res.redirect('/');
}


const adminController = require('./controllers/admin.controller');
const employeeController = require('./controllers/employee.controller');
const meterController = require('./controllers/meter.controller');
const meter_entriesController = require('./controllers/meter_entries.controller');


//User must see this to enter PIN
router.get('/', (req, res) => {
    res.render('index.ejs')
});


//Admin must see this to enter user & pass
router.get('/admin',  (req, res) => {
    res.render('admin.ejs')
});

router.post('/admin', passport.authenticate('local'), (req, res) => {
    // res.send(req.user)
    res.redirect('/admin/adminDash')
})

router.post('/logout', (req, res) => {
    req.logOut();
    console.log('logging out')
    res.sendStatus(200);

})



router.get('/form', checkAuth, (req, res) => {
    res.render('form.ejs')
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