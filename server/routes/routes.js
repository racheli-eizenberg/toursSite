const express = require('express'),
    tourRoutes = require('./tours');

var router = express.Router();

router.get('/tours', tourRoutes.get_tours);
router.post('/tours', tourRoutes.create_tour);
router.put('/tours/:id', tourRoutes.update_tour);
router.delete('/tours/:id', tourRoutes.delete_tour);

router.put('/tours/addSite/:id', tourRoutes.AddSiteToTourpath);

router.put('/tours/addCoupun/:id', tourRoutes.AddCuponToTour);

router.delete('/tours/deleteCoupun/:id/:codeCoupon', tourRoutes.deleteCopunFromTour);



router.get('/tours/:id', tourRoutes.get_tour);
module.exports = router;