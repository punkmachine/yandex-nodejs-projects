import { Router } from 'express';
import {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
} from '../controllers/user';
import {
  getUserByIdValidation,
  updateProfileValidation,
  updateAvatarValidation,
} from '../helpers/userValidations';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserByIdValidation, getUserById);
router.patch('/me', updateProfileValidation, updateProfile);
router.patch('/me/avatar', updateAvatarValidation, updateAvatar);

export default router;
