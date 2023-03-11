import  Router from 'express';

import authRouter from './user.routes';
// import  roomRouter  from './room_route.js';

const router = Router();

// router.use('/', roomRouter);
router.use('/users', authRouter);

export default router;