import { Router } from 'express';
import { getUsers, getUserById, createUser } from '../controllers/user';
import { createUserValidation, getUserByIdValidation } from '../helpers/userValidations';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserByIdValidation, getUserById);
router.post('/', createUserValidation, createUser);

export default router;
