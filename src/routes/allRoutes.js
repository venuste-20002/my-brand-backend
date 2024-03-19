const { Router } = require ("express");
const blogRoutes = require ('./blogRoutes.js');
const loginRoutes = require ('./routes.js');
const messageRoutes = require ('./messageRoutes.js');

const router = Router();

router.use('/blogs', blogRoutes)
router.use('/users', loginRoutes)
router.use('/messages',messageRoutes)

module.exports= router;
