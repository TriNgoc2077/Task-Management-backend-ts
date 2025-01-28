import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.middleware';
const router: Router = Router();

import * as controller from '../Controllers/user.Controller';

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/password/forgot', controller.forgotPassword);
router.post('/password/otp', controller.otpPassword);
router.post('/password/reset', controller.resetPassword);
router.get('/profile', requireAuth, controller.profile);
router.get('/listUser', requireAuth, controller.listUser);
router.get('/detail/:id', requireAuth, controller.detailUser);


export const userRouters: Router = router;