import {Router} from 'express';
const router = Router();
import userController from '../../controllers/user/user.controller.js'
console.log('we re here')
// const authMiddleware = require('../../middlewares/auth.middleware');
// const checkRole = require('../../middlewares/roles.middleware');
// import multer = require('multer');
// const upload = multer({ storage: multer.memoryStorage() });

// router.post('/createOwner',
//     // authMiddleware,
//     // checkRole(['SUPER_ADMIN']),
//     userController.createOwner
// );

// router.get('/getAllUsers',
//     // authMiddleware,
//     // checkRole(['SUPER_ADMIN']),
//     userController.getAllUsers
// );

// router.put('/updateOwner/:id',
//     // authMiddleware,
//     // checkRole(['SUPER_ADMIN']),
//     userController.updateOwner
// );

router.post('/register', 
  // authMiddleware,
  // checkRole(['SUPER_ADMIN']),
  userController.register);
// router.put('/:id', userController.updateUser);
// router.get('/:id/activate', userController.activateUser);
// router.get('/users', userController.getUsers);

// router.put('/settingsUpdateById/:id',
//   // authMiddleware, 
//   // checkRole(['SUPER_ADMIN']), 
//   userController.settingsUpdateById);
// router.put('/updateUser/:id',upload.single('avatar'),
//   // authMiddleware, 
//   // checkRole(['SUPER_ADMIN']), 
//   userController.updateUser);

// router.get('/getUserById/:id',
//   // authMiddleware, 
//   // checkRole(['SUPER_ADMIN']),
//    userController.getUserById);

// router.put('/updateProfileUser/:id',upload.single('avatar'),
//   // authMiddleware, 
//   // checkRole(['SUPER_ADMIN']), 
//   userController.updateProfileUser);

// router.put('/updateUserPoints/:id',
//   // authMiddleware, 
//   // checkRole(['SUPER_ADMIN']), 
//   userController.updateUserPoints);
// router.delete('/deleteUser/:id',
//   // authMiddleware, 
//   // checkRole(['SUPER_ADMIN']),
//    userController.deleteUser);
export default router;

