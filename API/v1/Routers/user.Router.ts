import { Router } from 'express';

const router: Router = Router();

import * as controller from '../Controllers/user.Controller';

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/password/forgot', controller.forgotPassword);
router.post('/password/otp', controller.otpPassword);
router.post('/password/reset', controller.resetPassword);
// router.get('/profile', authMiddlewares.requireAuth, controller.profile);
// router.get('/listUser', authMiddlewares.requireAuth, controller.listUser);

export const userRouters: Router = router;