const express = require('express'),
    userRoutes = require('./users'),
    tourRoutes = require('./tours');

var router = express.Router();


router.get('/users', userRoutes.read_users);
router.post('/users', userRoutes.create_user);
router.put('/users/:id', userRoutes.update_user);
router.delete('/users/:id', userRoutes.delete_user);

router.get('/tours', tourRoutes.get_tours);
router.post('/tours', tourRoutes.create_tour);
router.put('/tours/:id', tourRoutes.update_tour);
router.delete('/tours/:id', tourRoutes.delete_tour);

router.put('/tours/addSite/:id', tourRoutes.AddSiteToTourpath);

router.put('/tours/addCoupun/:id', tourRoutes.AddCuponToTour);

router.delete('/tours/deleteCoupun/:id/:codeCoupon', tourRoutes.deleteCopunFromTour);



router.get('/tours/:id', tourRoutes.get_tour);
module.exports = router;